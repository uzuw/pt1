const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Ensure unique email addresses
    lowercase: true, // Store emails in lowercase for consistency
  },
  password: {
    type: String,
    required: true, // Store the hashed password
  },
  avatar: String, // Optional (can be used for user profile picture)
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
