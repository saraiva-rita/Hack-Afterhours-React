const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn.js');

// Requiring Models
const Leisure = require('../models/Leisure.model.js');
const Review = require('../models/Review.model.js');
const User = require('../models/User.model.js');

// GET Route to display all the Leisure Spots in the Database
router.get('/leisureSpots', async (req, res) => {
  try {
    // Get all Leisure Spots from our Database via .find() method
    let leisureSpotsFromDB = await Leisure.find();
    res.json(leisureSpotsFromDB);
  } catch (error) {
    res.json('Error while getting Leisure Spots', error);
  }
});

// GET Route to display info about a specific Leisure Spot
router.get('/leisureSpots/:leisureId', isLoggedIn, async (req, res) => {
  try {
    //ES6 Object Destructuring with leisureId route param
    const { leisureId } = req.params;
    const currentUser = req.session.currentUser;

    let isFav = false;
    const thisUser = await User.findById(currentUser._id);
    if (thisUser.favoriteLeisure.includes(`${leisureId}`)) {
      isFav = true;
    }

    // Find Leisure Spot via its Id inside the Database and populate it with reviews with authors
    let foundLeisureSpot = await Leisure.findById(leisureId).populate({
      path: 'reviews',
      populate: {
        path: 'author',
        model: 'User',
      },
    });

    res.json(foundLeisureSpot, isFav);
  } catch {
    (error) => res.json(error);
  }
});

// Add Favorites Leisure Spots
router.post(
  '/leisureSpots/addFavs/:leisureId/',
  isLoggedIn,
  async (req, res) => {
    const { leisureId } = req.params;
    const currentUser = req.session.currentUser;

    try {
      // Find the user by ID
      const user = await User.findById(currentUser._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // Check if the leisure spot is already in favorites
      if (user.favoriteLeisure.includes(leisureId)) {
        return res
          .status(400)
          .json({ message: 'This Leisure Spot already in your favorites.' });
      }

      // Add the culture spot to favorites
      await User.findByIdAndUpdate(
        currentUser._id,
        {
          $push: { favoriteLeisure: leisureId },
        },
        { new: true }
      );
      res.json({
        message: 'This Leisure Spot was added to your favorites successfully.',
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

// Remove favorite from leisure spot detail
router.delete(
  '/leisureSpots/removeFavs/:leisureId/',
  isLoggedIn,
  async (req, res) => {
    const { leisureId } = req.params;
    const currentUser = req.session.currentUser;
    try {
      // Find the user by ID
      const user = await User.findById(currentUser._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // Update the user to remove the favorite leisure spot
      await User.findByIdAndUpdate(currentUser._id, {
        $pull: { favoriteLeisure: leisureId },
      });

      // Respond with success message
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

// Remove favorite from profile
router.post(
  '/profile/removeFavs1/:leisureId/',
  isLoggedIn,
  async (req, res) => {
    const { leisureId } = req.params;
    const currentUser = req.session.currentUser;
    try {
      // Find the user by ID (Optional)
      const user = await User.findById(currentUser._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // Update the user to remove the favorite culture spot
      await User.findByIdAndUpdate(currentUser._id, {
        $pull: { favoriteLeisure: leisureId },
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
router.post('/leisure/:leisureId/review', isLoggedIn, async (req, res) => {
  try {
    const { leisureId } = req.params;
    const { content } = req.body;
    const currentUser = req.session.currentUser;

    // Create a new review
    const newReview = await Review.create({ content });

    // Update the Leisure Spot with new review
    await Leisure.findByIdAndUpdate(leisureId, {
      $push: { reviews: newReview._id },
    });

    // Update the new review with the author
    await Review.findByIdAndUpdate(newReview._id, {
      $push: { author: currentUser._id },
    });

    // Add the review to the user
    await User.findByIdAndUpdate(currentUser._id, {
      $push: { reviewLeisure: newReview._id },
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
  '/leisure/:leisureId/reviews/:reviewId',
  isLoggedIn,
  async (req, res) => {
    const { leisureId, reviewId } = req.params;
    const user = req.session.currentUser;

    try {
      // Remove the review from the database
      await Review.findByIdAndRemove(reviewId);

      // Update the culture spot by removing the review reference
      await Leisure.findByIdAndUpdate(leisureId, {
        $pull: { reviews: reviewId },
      });

      // Remove the review reference from the user
      await User.findByIdAndUpdate(user._id, {
        $pull: { reviewLeisure: reviewId },
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
