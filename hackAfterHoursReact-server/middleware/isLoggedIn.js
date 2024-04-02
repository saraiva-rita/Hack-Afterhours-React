module.exports = (req, res, next) => {
  // checks if the user is logged in when trying to access a specific page
  if (req.session.currentUser) {
    // User is logged in, proceed to the next middleware
    next();
  } else {
    // User is not logged in, redirect to the login page
    res.redirect('/auth/login');
  }
};
