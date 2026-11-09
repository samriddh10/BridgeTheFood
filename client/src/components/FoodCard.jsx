import { MapPin, Clock, User, Calendar, Package, Leaf } from 'lucide-react';

const FoodCard = ({ food, onClaim }) => {
  // Format the expiry date to show time remaining
  const getExpiryText = () => {
    if (!food.expiryDate) return 'Not specified';
    
    const expiryDate = new Date(food.expiryDate);
    const now = new Date();
    const diffMs = expiryDate - now;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMs < 0) return 'Expired';
    if (diffHours < 1) return 'Expires in less than 1 hour';
    if (diffHours < 24) return `Expires in ${diffHours} hours`;
    return `Expires in ${diffDays} days`;
  };

  // Format distance
  const formatDistance = (dist) => {
    if (!dist) return 'Distance not available';
    return `${dist.toFixed(1)}km away`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      {/* Header with Title and Veg/Non-Veg Badge */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-bold text-white flex-1 pr-2">
            {food.title}
          </h3>
          {food.isVegetarian ? (
            <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center whitespace-nowrap">
              <Leaf className="w-3 h-3 mr-1" />
              Veg
            </span>
          ) : (
            <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
              Non-Veg
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2">
          {food.description}
        </p>

        {/* Quantity */}
        <div className="flex items-center text-gray-700">
          <Package className="w-4 h-4 mr-2 text-blue-600" />
          <span className="text-sm font-medium">{food.quantity}</span>
        </div>

        {/* Donor Name & Distance */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-700">
            <User className="w-4 h-4 mr-2 text-blue-600" />
            <span className="font-medium">
              {food.donor?.name || food.donorName || 'Anonymous'}
            </span>
          </div>
          {food.distance !== undefined && (
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-1 text-green-600" />
              <span>{formatDistance(food.distance)}</span>
            </div>
          )}
        </div>

        {/* Pickup Window */}
        <div className="bg-gray-50 rounded-lg p-3 space-y-2">
          <div className="flex items-center text-gray-700 text-sm">
            <Clock className="w-4 h-4 mr-2 text-orange-600" />
            <span className="font-medium">Pickup: {food.pickupWindow}</span>
          </div>
          <div className="flex items-center text-gray-700 text-sm">
            <Calendar className="w-4 h-4 mr-2 text-red-600" />
            <span className={`font-medium ${getExpiryText().includes('Expired') || getExpiryText().includes('less than') ? 'text-red-600' : ''}`}>
              {getExpiryText()}
            </span>
          </div>
        </div>
      </div>

      {/* Footer with Claim Button */}
      <div className="px-4 pb-4">
        {food.status === 'available' ? (
          <button
            onClick={() => onClaim(food._id)}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition font-medium"
          >
            Claim Now
          </button>
        ) : (
          <button
            disabled
            className="w-full bg-gray-400 text-white py-2 px-4 rounded-lg cursor-not-allowed font-medium"
          >
            Claimed
          </button>
        )}
      </div>
    </div>
  );
};

export default FoodCard;