// server/models/FoodListing.js
const mongoose = require('mongoose');

const foodListingSchema = new mongoose.Schema(
  {
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Donor ID is required']
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },
    quantity: {
      type: String,
      required: [true, 'Quantity is required'],
      trim: true
    },
    expiryDateTime: {
      type: Date,
      required: [true, 'Expiry date and time is required']
    },
    isVeg: {
      type: Boolean,
      required: [true, 'Vegetarian status is required']
    },
    pickupWindow: {
      type: String,
      required: [true, 'Pickup window is required'],
      trim: true
    },
    status: {
      type: String,
      enum: ['available', 'claimed', 'picked_up'],
      default: 'available'
    },
    claimedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('FoodListing', foodListingSchema);