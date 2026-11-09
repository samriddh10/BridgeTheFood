// server/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose'); // Added to listen for connection events
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Debug: Check if Environment Variables are loading
console.log('--- Environment Check ---');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Loaded (masked)' : 'NOT FOUND ❌');
console.log('PORT:', process.env.PORT);
console.log('-------------------------');

// Import routes
const authRoutes = require('./routes/authRoutes');
const foodRoutes = require('./routes/foodRoutes');

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// --- Enhanced Mongo Debugging ---
mongoose.connection.on('connected', () => {
  console.log('✅ Mongoose connected to DB Cluster');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ Mongoose disconnected');
});
// --------------------------------

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Food Rescue API is running' });
});

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});