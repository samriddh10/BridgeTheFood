// server/controllers/foodController.js
const FoodListing = require('../models/FoodListing');
const User = require('../models/User');

// @desc    Add a new food listing
// @route   POST /api/food/add
// @access  Private (Donor only)
const addFoodListing = async (req, res) => {
  try {
    // Verify user is a donor
    if (req.user.role !== 'donor') {
      return res.status(403).json({
        success: false,
        error: 'Only donors can add food listings'
      });
    }

    const { title, description, quantity, expiryDateTime, isVeg, pickupWindow } = req.body;

    // Validate required fields
    if (!title || !description || !quantity || !expiryDateTime || isVeg === undefined || !pickupWindow) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required fields'
      });
    }

    // Create food listing
    const foodListing = await FoodListing.create({
      donorId: req.user._id,
      title,
      description,
      quantity,
      expiryDateTime,
      isVeg,
      pickupWindow,
      status: 'available'
    });

    res.status(201).json({
      success: true,
      data: foodListing
    });
  } catch (error) {
    console.error('Add food listing error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while adding food listing'
    });
  }
};


// @desc    Get nearby available food listings
// @route   GET /api/food/nearby
// @access  Private (Receiver only)
const getNearbyFood = async (req, res) => {
  try {
    // Verify user is a receiver
    if (req.user.role !== 'receiver') {
      return res.status(403).json({
        success: false,
        error: 'Only receivers can view nearby food'
      });
    }

    const { lat, lng, distance } = req.query;

    // Validate coordinates
    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        error: 'Please provide latitude (lat) and longitude (lng) query parameters'
      });
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    const maxDistance = distance ? parseFloat(distance) * 1000 : 10000; // Convert km to meters, default 10km

    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid latitude or longitude values'
      });
    }

    // Step A: Find all Donors within specified distance using geospatial query
    const nearbyDonors = await User.find({
      role: 'donor',
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude] // [lng, lat]
          },
          $maxDistance: maxDistance // Dynamic distance in meters
        }
      }
    });

    // Step B: Get the IDs of those nearby donors
    const donorIds = nearbyDonors.map(donor => donor._id);

    // Step C: Find all FoodListings where donorId is in the list AND status is 'available'
    const availableFood = await FoodListing.find({
      donorId: { $in: donorIds },
      status: 'available'
    })
    .populate('donorId', 'name phone address location')
    .sort({ createdAt: -1 }); // Most recent first

    res.status(200).json({
      success: true,
      count: availableFood.length,
      distance: maxDistance / 1000, // Return distance in km
      data: availableFood
    });
  } catch (error) {
    console.error('Get nearby food error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching nearby food'
    });
  }
};

// @desc    Claim a food listing
// @route   PUT /api/food/:id/claim
// @access  Private (Receiver only)
const claimFoodListing = async (req, res) => {
  try {
    // Verify user is a receiver
    if (req.user.role !== 'receiver') {
      return res.status(403).json({
        success: false,
        error: 'Only receivers can claim food listings'
      });
    }

    const foodListing = await FoodListing.findById(req.params.id);

    if (!foodListing) {
      return res.status(404).json({
        success: false,
        error: 'Food listing not found'
      });
    }

    // Check if already claimed
    if (foodListing.status !== 'available') {
      return res.status(400).json({
        success: false,
        error: 'This food listing is no longer available'
      });
    }

    // Update listing
    foodListing.status = 'claimed';
    foodListing.claimedBy = req.user._id;
    await foodListing.save();

    const updatedListing = await FoodListing.findById(req.params.id)
      .populate('donorId', 'name phone address')
      .populate('claimedBy', 'name phone address');

    res.status(200).json({
      success: true,
      data: updatedListing
    });
  } catch (error) {
    console.error('Claim food listing error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while claiming food listing'
    });
  }
};

// @desc    Get donor's own food listings
// @route   GET /api/food/my-listings
// @access  Private (Donor only)
const getMyListings = async (req, res) => {
  try {
    // Verify user is a donor
    if (req.user.role !== 'donor') {
      return res.status(403).json({
        success: false,
        error: 'Only donors can view their listings'
      });
    }

    // Find all listings by this donor
    const listings = await FoodListing.find({ donorId: req.user._id })
      .sort({ createdAt: -1 }) // Most recent first
      .populate('claimedBy', 'name phone');

    res.status(200).json({
      success: true,
      count: listings.length,
      data: listings
    });
  } catch (error) {
    console.error('Get my listings error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching listings'
    });
  }
};


module.exports = {
  addFoodListing,
  getNearbyFood,
  claimFoodListing,
  getMyListings
};