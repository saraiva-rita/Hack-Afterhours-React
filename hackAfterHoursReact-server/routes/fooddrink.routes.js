const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');

// Requiring Models
const FoodDrink = require('../models/Fooddrink.model.js');
const Review = require('../models/Review.model.js');
const User = require('../models/User.model.js');

// GET Route to display all the Food and Drink Spots in the Database
router.get('/foodDrinksSpots', async (req, res) => {
  try {
    // Get all Food and Drink Spots from our Database via .find() method
    let FoodDrinksSpotsFromDB = await FoodDrink.find();
    res.json(FoodDrinksSpotsFromDB);
  } catch {
    (error) => res.json(error);
  }
});

// GET Route to display info about a specific Food and Drink Spot
router.get('/foodDrinksSpots/:fooddrinkId', isLoggedIn, async (req, res) => {
  try {
    //ES6 Object Destructuring with FoodDrinkId route param
    const { fooddrinkId } = req.params;
    let isFav;
    const currentUser = req.session.currentUser;

    const thisUser = await User.findById(currentUser._id);
    if (thisUser.favoriteFoodDrink.includes(`${fooddrinkId}`)) {
      isFav = true;
    }

    // Find Food and Drink Spot via its Id inside the Database
    let foundFoodDrinkSpot = await FoodDrink.findById(fooddrinkId);

    // Populate the Food and Drink Spot with reviews and reviews with authors
    await foundFoodDrinkSpot.populate({
      path: 'reviews',
      populate: {
        path: 'author',
        model: 'User',
      },
    });

    res.json(foundFoodDrinkSpot, isFav, currentUser);
  } catch {
    (error) => res.json(error);
  }
});

// Add favorites spots
// router.get('/addFavs', isLoggedIn, async (req, res) => {
//   const currentUser = req.session.currentUser;

//   try {
//     const user = await User.findById(currentUser._id);
//     await user.populate('addFavs');
//     res.json(user.myPlants);
//   } catch {
//     (error) => res.json(error);
//   }
// });

router.post(
  '/foodDrinksSpots/addFavs/:fooddrinkId/',
  isLoggedIn,
  async (req, res) => {
    const { fooddrinkId } = req.params;
    const currentUser = req.session.currentUser;
    try {
      const favSpot = await User.findByIdAndUpdate(currentUser._id, {
        $push: { favoriteFoodDrink: fooddrinkId },
      });
      res.json({
        message:
          'This Food and Drinks Spot was added to your favorites successfully.',
      });
    } catch (error) {
      res.status(500).json({
        message:
          'An error occurred while adding the Food and Drink Spot to your favorites',
      });
    }
  }
);

// Remove favorite from food and drink spot details
router.delete(
  '/foodDrinksSpots/removeFavs/:fooddrinkId/',
  isLoggedIn,
  async (req, res) => {
    const { fooddrinkId } = req.params;
    const currentUser = req.session.currentUser;
    try {
      await User.findById(currentUser._id);
      await User.findByIdAndUpdate(currentUser._id, {
        $pull: { favoriteFoodDrink: fooddrinkId },
      });
      res.redirect(`/foodDrinksSpots/${fooddrinkId}`);
    } catch {
      (error) => res.json(error);
    }
  }
);

// Remove favorite from profile
router.post(
  '/profile/removeFavs2/:fooddrinkId/',
  isLoggedIn,
  async (req, res) => {
    const { fooddrinkId } = req.params;
    const currentUser = req.session.currentUser;
    try {
      await User.findById(currentUser._id);
      await User.findByIdAndUpdate(currentUser._id, {
        $pull: { favoriteFoodDrink: fooddrinkId },
      });
      res.redirect(`/profile`);
    } catch {
      (error) => res.json(error);
    }
  }
);

// ADD REVIEWS
router.post('/review/FoodDrink/:fooddrinkId', isLoggedIn, async (req, res) => {
  try {
    const { fooddrinkId } = req.params;
    const { content } = req.body; // req: info about the request; what was sent through the body
    const user = req.session.currentUser;
    const newReview = await Review.create({ content });

    // update the Food and Drink Spot with new review that was created
    await FoodDrink.findByIdAndUpdate(fooddrinkId, {
      $push: { reviews: newReview._id },
    });

    // update the review with the author
    await Review.findByIdAndUpdate(newReview._id, {
      $push: { author: user._id },
    });

    // add the review to the user
    await User.findByIdAndUpdate(user._id, {
      $push: { reviewFoodDrink: newReview._id },
    });
    res.json(`/foodDrinksSpots/${fooddrinkId}`);
  } catch {
    (error) => res.json(error);
  }
});

// DELETE REVIEWS
router.delete(
  '/:reviewId/fooddrink-delete/:fooddrinkId',
  isLoggedIn,
  async (req, res) => {
    const { fooddrinkId, reviewId } = req.params;
    const user = req.session.currentUser;

    try {
      await Review.findByIdAndRemove(reviewId);

      // update the Food and Drinks Spot after remove the review
      await FoodDrink.findByIdAndUpdate(fooddrinkId, {
        $pull: { reviews: reviewId },
      });

      // remove the review from the user
      await User.findByIdAndUpdate(user._id, {
        $pull: { reviewFoodDrink: reviewId },
      });
      res.json(`/foodDrinksSpots/${fooddrinkId}`);
    } catch {
      (error) => res.json(error);
    }
  }
);

module.exports = router;
