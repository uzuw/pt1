const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();
require('dotenv').config();

// Importing client secrets from environment variables
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;

// Step 1: Redirecting to GitHub for OAuth
router.get('/github', (req, res) => {
  console.log('✅ /auth/github route was hit');
  const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user`;
  res.redirect(redirectUrl);
});

// GitHub callback route
router.get('/github/callback', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).json({ error: 'GitHub OAuth code is missing' });
  }

  try {
    // Step 2: Exchange the GitHub code for an access token
    const tokenRes = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      },
      {
        headers: {
          accept: 'application/json',
        },
      }
    );

    const accessToken = tokenRes.data.access_token;

    if (!accessToken) {
      return res.status(400).json({ error: 'GitHub authentication failed' });
    }

    // Step 3: Get user info from GitHub API
    const userRes = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    const { id, login, avatar_url, email } = userRes.data;

    // Step 4: Check if user already exists in the database
    let user = await User.findOne({ githubId: id });

    if (!user) {
      user = new User({
        githubId: id,
        username: login,
        avatar: avatar_url,
        email: email || '', // Empty email for private accounts
      });
      await user.save();
    }

    // Step 5: Generate a JWT token for the authenticated user
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    // Step 6: Redirect user with the token (Consider changing this for security)
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5000'; // Get frontend URL from env or default
    res.redirect(`${frontendUrl}?token=${token}`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'GitHub auth failed' });
  }
});

// Login route for email and password authentication
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Step 1: Check if user exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Step 2: Compare password with hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Step 3: Generate a JWT token for the authenticated user
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    // Step 4: Send the token in the response
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;
