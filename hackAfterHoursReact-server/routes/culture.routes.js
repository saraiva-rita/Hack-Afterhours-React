const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');

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
    let isFav;
    const currentUser = req.session.currentUser;

    const thisUser = await User.findById(currentUser._id);
    if (thisUser.favoriteCulture.includes(`${cultureId}`)) {
      isFav = true;
    }

    // Find Culture Spot via its Id inside the Database
    let foundCultureSpot = await Culture.findById(cultureId);

    // Populate the Culture Spot with reviews and reviews with authors
    await foundCultureSpot.populate({
      path: 'reviews',
      populate: {
        path: 'author',
        model: 'User',
      },
    });

    res.json(foundCultureSpot, isFav, currentUser);
  } catch {
    (error) => res.json(error);
  }
});

// Add Favorites Spots
router.post(
  '/cultureSpots/addFavs/:cultureId/',
  isLoggedIn,
  async (req, res) => {
    const { cultureId } = req.params;
    const currentUser = req.session.currentUser;

    try {
      await User.findById(currentUser._id);
      await User.findByIdAndUpdate(currentUser._id, {
        $push: { favoriteCulture: cultureId },
      });
      res.json({
        message: 'This Culture Spot was added to your favorites successfully.',
      });
      res.redirect(`/cultureSpots/${cultureId}`);
    } catch (error) {
      res.status(500).json({
        message:
          'An error occured while adding the Culture Spot to your favorites',
      });
    }
  }
);

// Remove favorite from culture spot detail
router.delete(
  '/cultureSpots/removeFavs/:cultureId/',
  isLoggedIn,
  async (req, res) => {
    const { cultureId } = req.params;
    const currentUser = req.session.currentUser;
    try {
      await User.findById(currentUser._id);
      await User.findByIdAndUpdate(currentUser._id, {
        $pull: { favoriteCulture: cultureId },
      });
      res.redirect(`/cultureSpots/${cultureId}`);
    } catch {
      (error) => res.json(error);
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
      await User.findById(currentUser._id);
      await User.findByIdAndUpdate(currentUser._id, {
        $pull: { favoriteCulture: cultureId },
      });
      res.redirect(`/profile`);
    } catch {
      (error) => res.json(error);
    }
  }
);

// ADD REVIEWS
router.post('/review/culture/:cultureId', isLoggedIn, async (req, res) => {
  try {
    const { cultureId } = req.params;
    const { content } = req.body; // req: info about the request; what was sent through the body
    const newReview = await Review.create({ content });
    const user = req.session.currentUser;

    // update the Culture Spot with new review that was created
    await Culture.findByIdAndUpdate(cultureId, {
      $push: { reviews: newReview._id },
    });

    await Review.findByIdAndUpdate(newReview._id, {
      $push: { author: user._id },
    });

    // add the review to the user
    await User.findByIdAndUpdate(user._id, {
      $push: { reviewCulture: newReview._id },
    });
    res.redirect(`/cultureSpots/${cultureId}`);
  } catch {
    (error) => res.json(error);
  }
});

// DELETE REVIEW
router.delete(
  '/:reviewId/culture-delete/:cultureId',
  isLoggedIn,
  async (req, res) => {
    const { cultureId, reviewId } = req.params;
    const user = req.session.currentUser;

    try {
      await Review.findByIdAndRemove(reviewId);

      // update the Culture Spot after remove the review
      await Culture.findByIdAndUpdate(cultureId, {
        $pull: { reviews: reviewId },
      });

      // remove the review from the user
      await User.findByIdAndUpdate(user._id, {
        $pull: { reviewCulture: reviewId },
      });
      res.redirect(`/profile`);
    } catch {
      (error) => res.json(error);
    }
  }
);

module.exports = router;
