const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');

// Requiring Models
const Fooddrink = require('../models/Fooddrink.model.js');
const Review = require('../models/Review.model.js');
const User = require('../models/User.model.js');

// GET Route to display all the Food and Drink Spots in the Database
router.get('/fooddrinkSpots', async (req, res) => {
  try {
    // Get all Food and Drink Spots from our Database via .find() method
    let fooddrinkSpotsFromDB = await Fooddrink.find();
    res.render('categories/fooddrinkSpots/foodndrink.list.hbs', {
      fooddrinkSpots: fooddrinkSpotsFromDB,
    });
  } catch (error) {
    console.log('Error while getting Food and Drink Spots', error);
  }
});

// GET Route to display info about a specific Food and Drink Spot
router.get('/fooddrinkSpots/:fooddrinkId', isLoggedIn, async (req, res) => {
  try {
    //ES6 Object Destructuring with fooddrinkId route param
    const { fooddrinkId } = req.params;
    let isFav;
    const currentUser = req.session.currentUser;

    const thisUser = await User.findById(currentUser._id);
    if (thisUser.favoriteFooddrink.includes(`${fooddrinkId}`)) {
      isFav = true;
    }

    // Find Food and Drink Spot via its Id inside the Database
    let foundFooddrinkSpot = await Fooddrink.findById(fooddrinkId);
    //populate
    await foundFooddrinkSpot.populate({
      path: 'reviews',
      populate: {
        path: 'author',
        model: 'User',
      },
    });

    res.render('categories/fooddrinkSpots/foodndrink.detail.hbs', {
      foundFooddrinkSpot,
      isFav,
      currentUser,
    });
  } catch (error) {
    console.log(error);
  }
});

// FAVORITES SPOTS Actions
router.post(
  '/fooddrinkSpots/addFavs/:fooddrinkId/',
  isLoggedIn,
  async (req, res, next) => {
    const { fooddrinkId } = req.params;
    const currentUser = req.session.currentUser;
    try {
      const favSpot = await User.findByIdAndUpdate(currentUser._id, {
        $push: { favoriteFooddrink: fooddrinkId },
      });
      res.redirect(`/fooddrinkSpots/${fooddrinkId}`);
    } catch (error) {
      console.log(error);
    }
  }
);

// Remove favorite from food'n'drink spot detail
router.post(
  '/fooddrinkSpots/removeFavs/:fooddrinkId/',
  isLoggedIn,
  async (req, res, next) => {
    const { fooddrinkId } = req.params;
    const currentUser = req.session.currentUser;
    try {
      const user = await User.findById(currentUser._id);
      const favSpot = await User.findByIdAndUpdate(currentUser._id, {
        $pull: { favoriteFooddrink: fooddrinkId },
      });
      res.redirect(`/fooddrinkSpots/${fooddrinkId}`);
    } catch (error) {
      console.log(error);
    }
  }
);

router.post(
  '/profile/removeFavs2/:fooddrinkId/',
  isLoggedIn,
  async (req, res, next) => {
    const { fooddrinkId } = req.params;
    const currentUser = req.session.currentUser;
    try {
      const user = await User.findById(currentUser._id);
      const favSpot = await User.findByIdAndUpdate(currentUser._id, {
        $pull: { favoriteFooddrink: fooddrinkId },
      });
      res.redirect(`/profile`);
    } catch (error) {
      console.log(error);
    }
  }
);

// ADD REVIEWS
router.post('/review/fooddrink/:fooddrinkId', async (req, res) => {
  try {
    const { fooddrinkId } = req.params;
    const { content } = req.body; // req: info about the request; what was sent through the body
    const user = req.session.currentUser;
    const newReview = await Review.create({ content });

    // update the Food and Drink Spot with new review that was created
    const fooddrinkUpdate = await Fooddrink.findByIdAndUpdate(fooddrinkId, {
      $push: { reviews: newReview._id },
    });

    const reviewUpdate = await Review.findByIdAndUpdate(newReview._id, {
      $push: { author: user._id },
    });

    // add the review to the user
    const userUpdate = await User.findByIdAndUpdate(user._id, {
      $push: { reviewFooddrink: newReview._id },
    });
    res.redirect(`/fooddrinkSpots/${fooddrinkId}`);
  } catch (error) {
    console.log(error);
  }
});

// REVIEWS DELETE
router.post(
  '/:reviewId/fooddrink-delete/:fooddrinkId',
  isLoggedIn,
  async (req, res) => {
    const { fooddrinkId, reviewId } = req.params;
    const user = req.session.currentUser;

    try {
      await Review.findByIdAndRemove(reviewId);

      // update the Food'n'Drinks Spot after remove the review
      await Fooddrink.findByIdAndUpdate(fooddrinkId, {
        $pull: { reviews: reviewId },
      });

      // remove the review from the user
      await User.findByIdAndUpdate(user._id, {
        $pull: { reviewFooddrink: reviewId },
      });
      res.redirect(`/fooddrinkSpots/${fooddrinkId}`);
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
