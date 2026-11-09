// client/src/api/foodApi.js
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/food';

// Get auth token
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
};

// Add food listing (Donor only)
export const addFoodListing = async (foodData) => {
  try {
    const response = await axios.post(
      `${API_URL}/add`,
      foodData,
      getAuthHeader()
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get nearby food (Receiver only)
export const getNearbyFood = async (lat, lng) => {
  try {
    const response = await axios.get(
      `${API_URL}/nearby?lat=${lat}&lng=${lng}`,
      getAuthHeader()
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Claim food (Receiver only)
export const claimFood = async (foodId) => {
  try {
    const response = await axios.put(
      `${API_URL}/${foodId}/claim`,
      {},
      getAuthHeader()
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};