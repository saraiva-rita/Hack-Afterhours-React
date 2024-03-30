const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');

// Requiring Models
const Leisure = require('../models/Leisure.model.js');
const Review = require('../models/Review.model.js');
const User = require('../models/User.model.js');

// GET Route to display all the Leisure Spots in the Database
router.get('/leisureSpots', async (req, res) => {
  try {
    // Get all Leisure Spots from our Database via .find() method
    let leisureSpotsFromDB = await Leisure.find();
    res.render('categories/leisureSpots/leisure.list.hbs', {
      leisureSpots: leisureSpotsFromDB,
    });
  } catch (error) {
    console.log('Error while getting Leisure Spots', error);
  }
});

// GET Route to display info about a specific Leisure Spot
router.get('/leisureSpots/:leisureId', isLoggedIn, async (req, res) => {
  try {
    //ES6 Object Destructuring with leisureId route param
    const { leisureId } = req.params;
    let isFav;
    const currentUser = req.session.currentUser;

    const thisUser = await User.findById(currentUser._id);
    if (thisUser.favoriteLeisure.includes(`${leisureId}`)) {
      isFav = true;
    }

    // Find Leisure Spot via its Id inside the Database
    let foundLeisureSpot = await Leisure.findById(leisureId);
    //populate
    await foundLeisureSpot.populate({
      path: 'reviews',
      populate: {
        path: 'author',
        model: 'User',
      },
    });

    res.render('categories/leisureSpots/leisure.detail.hbs', {
      foundLeisureSpot,
      isFav,
      currentUser,
    });
  } catch (error) {
    console.log(error);
  }
});

// FAVORITES SPOTS Actions
// Add Favorites
router.post(
  '/leisureSpots/addFavs/:leisureId/',
  isLoggedIn,
  async (req, res, next) => {
    const { leisureId } = req.params;
    const currentUser = req.session.currentUser;

    try {
      const user = await User.findById(currentUser._id);
      const favSpot = await User.findByIdAndUpdate(currentUser._id, {
        $push: { favoriteLeisure: leisureId },
      });
      res.redirect(`/leisureSpots/${leisureId}`);
    } catch (error) {
      console.log(error);
    }
  }
);

// Remove favorite from leisure spot detail
router.post(
  '/leisureSpots/removeFavs/:leisureId/',
  isLoggedIn,
  async (req, res, next) => {
    const { leisureId } = req.params;
    const currentUser = req.session.currentUser;
    try {
      const user = await User.findById(currentUser._id);
      const favSpot = await User.findByIdAndUpdate(currentUser._id, {
        $pull: { favoriteLeisure: leisureId },
      });
      res.redirect(`/leisureSpots/${leisureId}`);
    } catch (error) {
      console.log(error);
    }
  }
);

// Remove favorite from profile
router.post(
  '/profile/removeFavs1/:leisureId/',
  isLoggedIn,
  async (req, res, next) => {
    const { leisureId } = req.params;
    const currentUser = req.session.currentUser;
    try {
      const user = await User.findById(currentUser._id);
      const favSpot = await User.findByIdAndUpdate(currentUser._id, {
        $pull: { favoriteLeisure: leisureId },
      });
      res.redirect(`/profile`);
    } catch (error) {
      console.log(error);
    }
  }
);

// ADD REVIEWS
router.post('/review/leisure/:leisureId', async (req, res) => {
  try {
    const { leisureId } = req.params;
    const { content } = req.body; // req: info about the request; what was sent through the body
    const newReview = await Review.create({ content });
    const user = req.session.currentUser;

    // update the Leisure Spot with new review that was created
    const leisureUpdate = await Leisure.findByIdAndUpdate(leisureId, {
      $push: { reviews: newReview._id },
    });

    const reviewUpdate = await Review.findByIdAndUpdate(newReview._id, {
      $push: { author: user._id },
    });

    // add the review to the user
    const userUpdate = await User.findByIdAndUpdate(user._id, {
      $push: { reviewLeisure: newReview._id },
    });
    res.redirect(`/leisureSpots/${leisureId}`);
  } catch (error) {
    console.log(error);
  }
});

// DELETE REVIEW
router.post(
  '/:reviewId/leisure-delete/:leisureId',
  isLoggedIn,
  async (req, res) => {
    const { leisureId, reviewId } = req.params;
    const user = req.session.currentUser;

    try {
      await Review.findByIdAndRemove(reviewId);

      // update the Leisure Spot after remove the review
      await Leisure.findByIdAndUpdate(leisureId, {
        $pull: { reviews: reviewId },
      });

      // remove the review from the user
      await User.findByIdAndUpdate(user._id, {
        $pull: { reviewLeisure: reviewId },
      });
      res.redirect(`/profile`);
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
