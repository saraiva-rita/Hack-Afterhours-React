const session = require('express-session');
const MongoStore = require('connect-mongo');
const express = require('express');
const mongoose = require('mongoose');

// Create Express application
const app = express();

// Export session configuration function
module.exports = () => {
  // Configure app settings
  app.set('trust proxy', 1);

  // Set up session middleware
  app.use(
    session({
      secret: process.env.TOKEN_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 60000, // 60,000 ms that is equal to 1 minute
      },
      store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/HackAfterHours', // Your MongoDB connection URL
      }),
    })
  );
};
