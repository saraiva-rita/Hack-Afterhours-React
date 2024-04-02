// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv').config();

// ℹ️ Connects to the database
require('./db');

// Import session configuration function
const configureSession = require('./config/session.config');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');
const app = express();

// Configure session middleware
configureSession(app);

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app);

// 👇 Start handling routes here
const indexRoutes = require('./routes/index.routes');
app.use('/', indexRoutes);

const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);

const cultureRoutes = require('./routes/culture.routes');
app.use('/', cultureRoutes);

const leisureRoutes = require('./routes/leisure.routes');
app.use('/', leisureRoutes);

const foodDrinkRoutes = require('./routes/fooddrink.routes');
app.use('/', foodDrinkRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
