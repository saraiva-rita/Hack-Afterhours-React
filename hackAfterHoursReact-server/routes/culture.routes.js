const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn.js');

// Requiring Models
const Culture = require('../models/Culture.model.js');
const Review = require('../models/Review.model.js');
const User = require('../models/User.model.js');

// GET Route to display all the Culture Spots in the Database
router.get('/cultureSpots', async (req, res) => {
  try {
    // Get all Culture Spots from our Database via .find() method
    let cultureSpotsFromDB = await Culture.find();
    res.json(cultureSpotsFromDB);
  } catch (error) {
    res.json('Error while getting Culture Spots', error);
  }
});

// GET Route to display info about a specific Culture Spot
router.get('/cultureSpots/:cultureId', isLoggedIn, async (req, res) => {
  try {
    //ES6 Object Destructuring with cultureId route param
    const { cultureId } = req.params;
    const currentUser = req.session.currentUser;

    let isFav = false;
    const thisUser = await User.findById(currentUser._id);
    if (thisUser.favoriteCulture.includes(`${cultureId}`)) {
      isFav = true;
    }

    // Find Culture Spot via its Id inside the Database and populate it with reviews with authors
    let foundCultureSpot = await Culture.findById(cultureId).populate({
      path: 'reviews',
      populate: {
        path: 'author',
        model: 'User',
      },
    });

    res.json({ foundCultureSpot, isFav });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add Favorites Culture Spots
router.post(
  '/cultureSpots/addFavs/:cultureId/',
  isLoggedIn,
  async (req, res) => {
    const { cultureId } = req.params;
    const currentUser = req.session.currentUser;

    try {
      // Find the user by ID
      const user = await User.findById(currentUser._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // Check if the culture spot is already in favorites
      if (user.favoriteCulture.includes(cultureId)) {
        return res
          .status(400)
          .json({ message: 'This Culture Spot already in your favorites.' });
      }

      // Add the culture spot to favorites
      await User.findByIdAndUpdate(
        currentUser._id,
        {
          $push: { favoriteCulture: cultureId },
        },
        { new: true }
      );
      res.json({
        message: 'This Culture Spot was added to your favorites successfully.',
      });
      res.json({ foundCultureSpot, isFav, currentUser });
    } catch (error) {
      res.status(500).json({
        message:
          'An error occurred while adding the Culture Spot to your favorites.',
        error: error.message,
      });
    }
  }
);

// Remove favorite from culture spot details
router.delete(
  '/cultureSpots/removeFavs/:cultureId/',
  isLoggedIn,
  async (req, res) => {
    const { cultureId } = req.params;
    const currentUser = req.session.currentUser;
    try {
      // Find the user by ID
      const user = await User.findById(currentUser._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // Update the user to remove the favorite culture spot
      await User.findByIdAndUpdate(currentUser._id, {
        $pull: { favoriteCulture: cultureId },
      });

      // Respond with success message
      res.json({
        success: true,
        message: 'Culture Spot removed from favorites successfully',
      });
    } catch (error) {
      // Handle errors
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

// Remove favorite from profile
router.post(
  '/profile/removeFavs3/:cultureId/',
  isLoggedIn,
  async (req, res) => {
    const { cultureId } = req.params;
    const currentUser = req.session.currentUser;
    try {
      // Find the user by ID (Optional)
      const user = await User.findById(currentUser._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // Update the user to remove the favorite culture spot
      await User.findByIdAndUpdate(currentUser._id, {
        $pull: { favoriteCulture: cultureId },
      });

      // Respond with success message or updated list of favorite culture spots
      res.json({
        success: true,
        message: 'Spot removed from favorites successfully',
      });
    } catch (error) {
      // Handle errors
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

// ADD REVIEWS
router.post('/culture/:cultureId/review', isLoggedIn, async (req, res) => {
  try {
    const { cultureId } = req.params;
    const { content } = req.body;
    const currentUser = req.session.currentUser;

    // Create a new review
    const newReview = await Review.create({ content });

    // Update the Culture Spot with new review
    await Culture.findByIdAndUpdate(cultureId, {
      $push: { reviews: newReview._id },
    });

    // Update the new review with the author
    await Review.findByIdAndUpdate(newReview._id, {
      $push: { author: currentUser._id },
    });

    // Add the review to the user
    await User.findByIdAndUpdate(currentUser._id, {
      $push: { reviewCulture: newReview._id },
    });

    // Respond with the new review or a success message
    res.json({ success: true, review: newReview });
  } catch (error) {
    // Handle errors
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE REVIEW
router.delete(
  '/culture/:cultureId/reviews/:reviewId',
  isLoggedIn,
  async (req, res) => {
    const { cultureId, reviewId } = req.params;
    const currentUser = req.session.currentUser;

    try {
      // Remove the review from the database
      await Review.findByIdAndRemove(reviewId);

      // Update the culture spot by removing the review reference
      await Culture.findByIdAndUpdate(cultureId, {
        $pull: { reviews: reviewId },
      });

      // Remove the review reference from the user
      await User.findByIdAndUpdate(currentUser._id, {
        $pull: { reviewCulture: reviewId },
      });

      // Respond with a success message or the updated spot data
      res.json({ success: true, message: 'Review deleted successfully' });
    } catch (error) {
      // Handle errors
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

module.exports = router;
