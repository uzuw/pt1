const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const schema = require('./schema/schema');
const connectDB = require('./config/db');
require('dotenv').config(); // Environment variables
const colors=require('colors');
const PORT = process.env.PORT || 5000;

// Express app instance
const app = express();

// Connecting to the database
connectDB();

// CORS setup
app.use(cors());

// Root endpoint (optional, just to confirm the server is alive)
app.get('/', (req, res) => {
  res.send('Backend is alive!');
});

// GraphQL endpoint
app.use(
  '/graphql',
  graphqlHTTP((req) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
    let userId = null;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id;
      } catch (err) {
        console.error('Invalid token');
      }
    }

    return {
      schema,
      context: { userId }, // Pass the userId into the context for the resolvers
      graphiql: true, // Enable GraphiQL interface (for development)
    };
  })
);

// Start the server
app.listen(PORT, console.log(`Server is now running on port ${PORT}`));
