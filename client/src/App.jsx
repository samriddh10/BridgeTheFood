import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import DonorDashboard from './pages/DonorDashboard';
import ReceiverFeed from './pages/ReceiverFeed';
import { Heart, Users, HandHeart } from 'lucide-react';
import LandingPage from './pages/LandingPage';

// Home Page Component
const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 text-white p-4 rounded-full">
              <Heart className="w-16 h-16" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Welcome to FoodShare
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connecting food donors with those in need. Together, we can reduce food waste 
            and help our community.
          </p>
          
          {!user && (
            <div className="flex justify-center space-x-4">
              <a
                href="/register"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
              >
                Get Started
              </a>
              <a
                href="/login"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-medium border-2 border-blue-600 hover:bg-blue-50 transition"
              >
                Login
              </a>
            </div>
          )}

          {user && (
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
              <p className="text-lg text-gray-700 mb-4">
                Welcome back, <span className="font-semibold">{user.name}</span>!
              </p>
              <a
                href={user.role === 'donor' ? '/donor' : '/receiver'}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition inline-block"
              >
                Go to Dashboard
              </a>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 text-green-600 p-3 rounded-full mr-4">
                <HandHeart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">For Donors</h3>
            </div>
            <p className="text-gray-600">
              Share your surplus food with those in need. Post available food items 
              and help reduce waste while making a difference.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-full mr-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">For Receivers</h3>
            </div>
            <p className="text-gray-600">
              Find available food donations near you. Browse nearby listings and 
              claim food that meets your needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/donor" 
              element={
                <ProtectedRoute role="donor">
                  <DonorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/receiver" 
              element={
                <ProtectedRoute role="receiver">
                  <ReceiverFeed />
                </ProtectedRoute>
              } 
            />
            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;