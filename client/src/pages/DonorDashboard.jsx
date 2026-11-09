// client/src/pages/DonorDashboard.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { 
  Plus, 
  Package, 
  Calendar, 
  Clock, 
  FileText, 
  CheckCircle,
  AlertCircle,
  Leaf,
  MapPin,
  User
} from 'lucide-react';

const DonorDashboard = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    quantity: '',
    expiryDateTime: '',
    pickupWindow: '',
    isVeg: false
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [myListings, setMyListings] = useState([]); // ✅ Add state for listings
  const [loadingListings, setLoadingListings] = useState(true); // ✅ Add loading state

  // ✅ Fetch donor's listings on component mount
  useEffect(() => {
    fetchMyListings();
  }, []);

  const fetchMyListings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'http://localhost:5001/api/food/my-listings',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setMyListings(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching listings:', err);
    } finally {
      setLoadingListings(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      
      await axios.post(
        'http://localhost:5001/api/food/add',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSuccess('Food Posted Successfully! 🎉');
      
      // Clear form
      setFormData({
        title: '',
        description: '',
        quantity: '',
        expiryDateTime: '',
        pickupWindow: '',
        isVeg: false
      });

      // ✅ Refresh listings after adding new food
      fetchMyListings();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error posting food:', err);
      setError(err.response?.data?.error || 'Failed to post food. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Helper function to get status badge color
  const getStatusBadge = (status) => {
    const statusConfig = {
      available: { bg: 'bg-green-100', text: 'text-green-800', label: 'Available' },
      claimed: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Claimed' },
      picked_up: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Picked Up' }
    };
    
    const config = statusConfig[status] || statusConfig.available;
    
    return (
      <span className={`${config.bg} ${config.text} text-xs font-semibold px-2.5 py-1 rounded-full`}>
        {config.label}
      </span>
    );
  };

  // ✅ Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Donor Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.name}!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Food Form - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-6">
                <div className="bg-blue-600 text-white p-2 rounded-lg mr-3">
                  <Plus className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Add Food Donation</h2>
              </div>

              {/* Success Message */}
              {success && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span className="font-medium">{success}</span>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Food Title *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Package className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="e.g., Fresh Vegetables"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <FileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows="3"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Describe the food items..."
                    />
                  </div>
                </div>

                {/* Quantity and Vegetarian Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity *
                    </label>
                    <input
                      id="quantity"
                      name="quantity"
                      type="text"
                      value={formData.quantity}
                      onChange={handleChange}
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="e.g., 5kg, 10 servings"
                    />
                  </div>

                  <div className="flex items-end">
                    <label className="flex items-center space-x-3 cursor-pointer bg-gray-50 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition w-full">
                      <input
                        id="isVeg"
                        name="isVeg"
                        type="checkbox"
                        checked={formData.isVeg}
                        onChange={handleChange}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex items-center space-x-2">
                        <Leaf className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-gray-700">Vegetarian</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Expiry Date and Pickup Window Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDateTime" className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date/Time *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="expiryDateTime"
                        name="expiryDateTime"
                        type="datetime-local"
                        value={formData.expiryDateTime}
                        onChange={handleChange}
                        required
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="pickupWindow" className="block text-sm font-medium text-gray-700 mb-2">
                      Pickup Window *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="pickupWindow"
                        name="pickupWindow"
                        type="text"
                        value={formData.pickupWindow}
                        onChange={handleChange}
                        required
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="e.g., Before 6 PM, 2-5 PM"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Posting...
                    </span>
                  ) : (
                    'Post Food Donation'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* ✅ My Donations - Now shows actual listings */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">My Donations</h2>
              
              {loadingListings ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-gray-500 text-sm mt-4">Loading...</p>
                </div>
              ) : myListings.length === 0 ? (
                <div className="text-center py-8">
                  <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-sm">
                    No donations yet. Add your first one!
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {myListings.map((listing) => (
                    <div 
                      key={listing._id} 
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-800 text-sm">{listing.title}</h3>
                        {getStatusBadge(listing.status)}
                      </div>
                      
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">{listing.description}</p>
                      
                      <div className="space-y-1.5 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Package className="w-3.5 h-3.5 mr-2" />
                          <span>{listing.quantity}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-3.5 h-3.5 mr-2" />
                          <span>Expires: {formatDate(listing.expiryDateTime)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3.5 h-3.5 mr-2" />
                          <span>{listing.pickupWindow}</span>
                        </div>
                        {listing.isVeg && (
                          <div className="flex items-center">
                            <Leaf className="w-3.5 h-3.5 mr-2 text-green-600" />
                            <span className="text-green-600">Vegetarian</span>
                          </div>
                        )}
                        {listing.claimedBy && (
                          <div className="flex items-center mt-2 pt-2 border-t border-gray-200">
                            <User className="w-3.5 h-3.5 mr-2 text-blue-600" />
                            <span className="text-blue-600">Claimed by {listing.claimedBy.name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;