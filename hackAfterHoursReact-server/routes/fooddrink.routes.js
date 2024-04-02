const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn.js');

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
    (error) => res.json('Error while getting Food and Drink Spots', error);
  }
});

// GET Route to display info about a specific Food and Drink Spot
router.get('/foodDrinksSpots/:fooddrinkId', isLoggedIn, async (req, res) => {
  try {
    //ES6 Object Destructuring with FoodDrinkId route param
    const { fooddrinkId } = req.params;
    const currentUser = req.session.currentUser;

    let isFav = false;
    const thisUser = await User.findById(currentUser._id);
    if (thisUser.favoriteFoodDrink.includes(`${fooddrinkId}`)) {
      isFav = true;
    }

    // Find Food and Drink Spot via its Id inside the Database and populate it with reviews with authors
    let foundFoodDrinkSpot = await FoodDrink.findById(fooddrinkId).populate({
      path: 'reviews',
      populate: {
        path: 'author',
        model: 'User',
      },
    });

    res.json(foundFoodDrinkSpot, isFav);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add Favorites Food and Drink Spots
router.post(
  '/foodDrinksSpots/addFavs/:fooddrinkId/',
  isLoggedIn,
  async (req, res) => {
    const { fooddrinkId } = req.params;
    const currentUser = req.session.currentUser;

    try {
      // Find the user by ID
      const user = await User.findById(currentUser._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // Check if the Food and Drink spot is already in favorites
      if (user.favoriteFoodDrink.includes(fooddrinkId)) {
        return res
          .status(400)
          .json({ message: 'This Culture Spot already in your favorites.' });
      }

      // Add the culture spot to favorites
      await User.findByIdAndUpdate(
        currentUser._id,
        {
          $push: { favoriteFoodDrink: fooddrinkId },
        },
        { new: true }
      );
      res.json({
        message:
          'This Food and Drinks Spot was added to your favorites successfully.',
      });
      res.json({ foundCultureSpot, isFav, currentUser });
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
      // Find the user by ID
      const user = await User.findById(currentUser._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // Update the user to remove the favorite food and drink spot
      await User.findByIdAndUpdate(currentUser._id, {
        $pull: { favoriteFoodDrink: fooddrinkId },
      });

      // Respond with success message
      res.json({
        success: true,
        message: 'Food and Drink Spot removed from favorites successfully',
      });
    } catch (error) {
      // Handle errors
      res.status(500).json({ success: false, error: error.message });
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
      // Find the user by ID (Optional)
      const user = await User.findById(currentUser._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // Update the user to remove the favorite food and drink spot
      await User.findByIdAndUpdate(currentUser._id, {
        $pull: { favoriteFoodDrink: fooddrinkId },
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
router.post('/review/FoodDrink/:fooddrinkId', isLoggedIn, async (req, res) => {
  try {
    const { fooddrinkId } = req.params;
    const { content } = req.body;
    const currentUser = req.session.currentUser;

    // Create a new review
    const newReview = await Review.create({ content });

    // Update the Food and Drink Spot with new review
    await FoodDrink.findByIdAndUpdate(fooddrinkId, {
      $push: { reviews: newReview._id },
    });

    // Update the review with the author
    await Review.findByIdAndUpdate(newReview._id, {
      $push: { author: currentUser._id },
    });

    // Add the review to the user
    await User.findByIdAndUpdate(currentUser._id, {
      $push: { reviewFoodDrink: newReview._id },
    });

    // Respond with the new review or a success message
    res.json({ success: true, review: newReview });
  } catch (error) {
    // Handle errors
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE REVIEWS
router.delete(
  '/:reviewId/fooddrink-delete/:fooddrinkId',
  isLoggedIn,
  async (req, res) => {
    const { fooddrinkId, reviewId } = req.params;
    const currentUser = req.session.currentUser;

    try {
      // Remove the review from the database
      await Review.findByIdAndRemove(reviewId);

      // Update the Food and Drinks Spot after remove the review reference
      await FoodDrink.findByIdAndUpdate(fooddrinkId, {
        $pull: { reviews: reviewId },
      });

      // Remove the review reference from the user
      await User.findByIdAndUpdate(currentUser._id, {
        $pull: { reviewFoodDrink: reviewId },
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
