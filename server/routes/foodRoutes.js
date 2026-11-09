// server/routes/foodRoutes.js
const express = require('express');
const router = express.Router();
const { 
  addFoodListing, 
  getNearbyFood, 
  claimFoodListing,
    getMyListings
} = require('../controllers/foodController');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/food/add
// @desc    Donor adds a new food listing
// @access  Private (Donor only)
router.post('/add', protect, addFoodListing);

// @route   GET /api/food/my-listings
// @desc    Get donor's own listings
// @access  Private (Donor only)
router.get('/my-listings', protect, getMyListings); // ✅ Add this route


// @route   GET /api/food/nearby
// @desc    Receiver gets nearby available food listings
// @access  Private (Receiver only)
router.get('/nearby', protect, getNearbyFood);

// @route   PUT /api/food/:id/claim
// @desc    Receiver claims a food listing
// @access  Private (Receiver only)
router.put('/:id/claim', protect, claimFoodListing);

module.exports = router;