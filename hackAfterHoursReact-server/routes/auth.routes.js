const express = require('express');
const router = express.Router();

// ℹ️ Handles password encryption
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;

// Require the User model in order to interact with the database
const User = require('../models/User.model.js');

// Require necessary (isLoggedOut and isLoggedIn) middleware in order to control access to specific routes
const isLoggedOut = require('../middleware/isLoggedOut.js');
const isLoggedIn = require('../middleware/isLoggedIn.js');

// GET / Auth / Signup
router.get('/signup', isLoggedOut, (req, res) => {
  res.json({ currentUser: req.session.currentUser });
});

// POST / Auth / Signup
router.post('/signup', isLoggedOut, (req, res) => {
  const { username, email, password } = req.body;

  // Check that username, email, and password are provided
  if (username === '' || email === '' || password === '') {
    res.status(400).json({
      errorMessage:
        'All fields are mandatory. Please provide your username, email and password.',
    });

    return;
  }

  if (password.length < 6) {
    res.status(400).json({
      errorMessage: 'Your password needs to be at least 6 characters long.',
    });

    return;
  }

  // ! This regular expression checks password for special characters and minimum length

  // Create a new user - start by hashing the password
  bcrypt
    .genSalt(saltRounds)
    .then((salt) => bcrypt.hash(password, salt))
    .then((hashedPassword) => {
      // Create a user and save it in the database
      return User.create({ username, email, password: hashedPassword });
    })
    .then((user) => {
      res.redirect('/auth/login');
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).json({ errorMessage: error.message });
      } else if (error.code === 11000) {
        res.status(500).json({
          errorMessage:
            'Username and email need to be unique. Provide a valid username or email.',
        });
      } else {
        next(error);
      }
    });
});

// GET / Auth / Login
router.get('/login', isLoggedOut, (req, res) => {
  res.json({ currentUser: req.session.currentUser });
});

// POST / Auth / Login
router.post('/login', isLoggedOut, (req, res, next) => {
  const { username, email, password } = req.body;

  // Check that username, email, and password are provided
  if (username === '' || email === '' || password === '') {
    res.status(400).json({
      errorMessage:
        'All fields are mandatory. Please provide username, email and password.',
    });

    return;
  }

  // Here we use the same logic as above
  // - either length based parameters or we check the strength of a password
  if (password.length < 6) {
    return res.status(400).json({
      errorMessage: 'Your password needs to be at least 6 characters long.',
    });
  }

  // Search the database for a user with the email submitted in the form
  User.findOne({ email })
    .then((user) => {
      // If the user isn't found, send an error message that user provided wrong credentials
      if (!user) {
        res.status(400).json({ errorMessage: 'Wrong credentials.' });
        return;
      }

      // If user is found based on the username, check if the in putted password matches the one saved in the database
      bcrypt
        .compare(password, user.password)
        .then((isSamePassword) => {
          if (!isSamePassword) {
            res.status(400).json({ errorMessage: 'Wrong credentials.' });
            return;
          }

          // Add the user object to the session object
          req.session.currentUser = user.toObject();
          // Remove the password field
          delete req.session.currentUser.password;

          res.redirect('/profile');
        })
        .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
    })
    .catch((err) => next(err));
});

// GET / Auth / Logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json('auth/logout', { errorMessage: err.message });
      return;
    }
    res.redirect('/');
  });
});

module.exports = router;
