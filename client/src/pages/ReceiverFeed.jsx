// client/src/pages/ReceiverFeed.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import FoodCard from '../components/FoodCard';
import axios from 'axios';
import { Search, MapPin, AlertCircle, Loader, Filter } from 'lucide-react';

const ReceiverFeed = () => {
  const { user } = useAuth();
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDistance, setSelectedDistance] = useState(10); // Default 10km

  useEffect(() => {
    if (user) {
      fetchNearbyFood();
    }
  }, [user, selectedDistance]); // Re-fetch when distance changes

  const fetchNearbyFood = async () => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('token');
      
      // Check if user has location data
      if (!user?.location?.coordinates) {
        setError('Location data not available. Please update your profile with location information.');
        setLoading(false);
        return;
      }

      // GeoJSON format: coordinates[0] = longitude, coordinates[1] = latitude
      const lat = user.location.coordinates[1];
      const lng = user.location.coordinates[0];

      const response = await axios.get(
        `http://localhost:5001/api/food/nearby?lat=${lat}&lng=${lng}&distance=${selectedDistance}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setFoodItems(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch nearby food. Please try again.');
      console.error('Error fetching food:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClaim = async (id) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.put(
        `http://localhost:5001/api/food/${id}/claim`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        // Refresh the food list after claiming
        fetchNearbyFood();
        alert('Food claimed successfully! 🎉');
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to claim food. Please try again.');
      console.error('Error claiming food:', err);
    }
  };

  const distanceOptions = [
    { value: 5, label: '5 km' },
    { value: 10, label: '10 km' },
    { value: 20, label: '20 km' },
    { value: 25, label: '25 km' },
    { value: 999999, label: 'All Listings' } // Very large number for "all"
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <Search className="w-8 h-8 mr-3 text-blue-600" />
            Available Food Near You
          </h1>
          <p className="text-gray-600 mt-2 flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            Welcome, {user?.name}
          </p>
        </div>

        {/* Distance Filter */}
        <div className="mb-6 bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center mb-3">
            <Filter className="w-5 h-5 text-gray-600 mr-2" />
            <h3 className="font-semibold text-gray-800">Search Radius</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {distanceOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedDistance(option.value)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedDistance === option.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          {selectedDistance !== 999999 && (
            <p className="text-sm text-gray-500 mt-3">
              Showing donations within {selectedDistance} km of your location
            </p>
          )}
          {selectedDistance === 999999 && (
            <p className="text-sm text-gray-500 mt-3">
              Showing all available donations (no distance limit)
            </p>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-600">Loading nearby food donations...</p>
          </div>
        ) : (
          <>
            {/* Results Count */}
            {foodItems.length > 0 && (
              <div className="mb-4">
                <p className="text-gray-600 text-sm">
                  Found <strong>{foodItems.length}</strong> donation{foodItems.length !== 1 ? 's' : ''}
                </p>
              </div>
            )}

            {/* Food Items Grid */}
            {foodItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {foodItems.map((food) => (
                  <FoodCard 
                    key={food._id} 
                    food={food} 
                    onClaim={handleClaim}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No food found nearby
                </h3>
                <p className="text-gray-600 mb-4">
                  {selectedDistance === 999999 
                    ? 'There are no available food donations at the moment.'
                    : `There are no available food donations within ${selectedDistance} km of your location.`
                  }
                </p>
                <button
                  onClick={fetchNearbyFood}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Refresh
                </button>
              </div>
            )}
          </>
        )}

        {/* Info Box */}
        {foodItems.length > 0 && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Tip:</strong> Click the "Claim Food" button to reserve a donation. 
              Make sure to pick it up within the specified pickup window!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceiverFeed;