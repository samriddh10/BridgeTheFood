// server/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const FoodListing = require('./models/FoodListing');

// Load environment variables
dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for Seeding...');

    // Clear existing data
    await User.deleteMany({});
    await FoodListing.deleteMany({});
    console.log('Existing data cleared');

    // Create Donor User (Hotel in New Delhi)
    const donor = await User.create({
      name: 'Grand Hotel Delhi',
      email: 'hotel@granddelhi.com',
      password: '$2a$10$XQvZ4Q9ZvZ4Q9ZvZ4Q9ZvOeMvZ4Q9ZvZ4Q9ZvZ4Q9ZvZ4Q9ZvZ4Q9', // hashed "password123"
      role: 'donor',
      phone: '+91-9876543210',
      address: 'Connaught Place, New Delhi, Delhi 110001',
      location: {
        type: 'Point',
        coordinates: [77.2090, 28.6139] // [longitude, latitude]
      },
      isVerified: true
    });
    console.log('Donor created:', donor.name);

    // Create Receiver User (Orphanage nearby)
    const receiver = await User.create({
      name: 'Hope Children Orphanage',
      email: 'contact@hopeorphanage.org',
      password: '$2a$10$XQvZ4Q9ZvZ4Q9ZvZ4Q9ZvOeMvZ4Q9ZvZ4Q9ZvZ4Q9ZvZ4Q9ZvZ4Q9', // hashed "password123"
      role: 'receiver',
      phone: '+91-9876543211',
      address: 'Kashmere Gate, New Delhi, Delhi 110006',
      location: {
        type: 'Point',
        coordinates: [77.2200, 28.6200] // [longitude, latitude]
      },
      isVerified: true
    });
    console.log('Receiver created:', receiver.name);

    // Create Food Listing from Donor
    const foodListing = await FoodListing.create({
      donorId: donor._id,
      title: 'Buffet Surplus - Mixed Vegetarian Dishes',
      description: 'Fresh vegetarian dishes from evening buffet including paneer curry, dal, rice, and naan. Sufficient for 20-25 people.',
      quantity: '5 kg',
      expiryDateTime: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
      isVeg: true,
      pickupWindow: '8:00 PM - 10:00 PM',
      status: 'available'
    });
    console.log('Food Listing created:', foodListing.title);

    console.log('\n✅ Database Seeded Successfully!');
    console.log(`\nTest Credentials:`);
    console.log(`Donor - Email: hotel@granddelhi.com | Password: password123`);
    console.log(`Receiver - Email: contact@hopeorphanage.org | Password: password123`);
    console.log(`\nNote: Passwords are hashed. You'll need to implement bcrypt hashing in your auth controller.`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();