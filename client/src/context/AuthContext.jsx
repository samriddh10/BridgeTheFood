// client/src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch full user data from backend
  const fetchUserData = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setUser(response.data.data);
        return response.data.data;
      }
    } catch (error) {
      console.error('Fetch user data error:', error);
      // If token is invalid, clear it
      localStorage.removeItem('token');
      setUser(null);
      return null; // ✅ Return null on error
    }
  };

  // ✅ FIXED: Login function now returns user data
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });

      if (response.data.success) {
        const { token } = response.data.data;
        
        // Save token to localStorage
        localStorage.setItem('token', token);
        
        // Fetch full user data including location
        const userData = await fetchUserData(token);
        
        // ✅ Return user data along with success
        return { success: true, data: userData };
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Login failed'
      };
    }
  };

  // ✅ FIXED: Register function now returns user data
  const register = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);

      if (response.data.success) {
        const { token } = response.data.data;
        
        // Save token to localStorage
        localStorage.setItem('token', token);
        
        // Fetch full user data including location
        const userInfo = await fetchUserData(token);
        
        // ✅ Return user data along with success
        return { success: true, data: userInfo };
      }
    } catch (error) {
      console.error('Register error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Registration failed'
      };
    }
  };

  // Logout function
  const logout = () => {
    // Clear token from localStorage
    localStorage.removeItem('token');
    
    // Clear user state
    setUser(null);
  };

  // Auto-login with user data fetch
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        // Fetch full user data when app loads
        await fetchUserData(token);
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  const value = {
    user,
    loading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};