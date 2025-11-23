import axios from 'axios';
import mockData from './mockTransport.json';

/**
 * API Service Layer
 * Simulates backend API calls using local JSON data
 * In production, replace with actual API endpoints
 */

// Base URL for API (not used in mock, but kept for future)
const API_BASE_URL = 'http://localhost:3000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch all transport routes
 * Currently returns mock data from local JSON
 * Replace with: apiClient.get('/transports')
 */
export const fetchTransports = async () => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return mock data (simulating API response)
    return mockData;
    
    // For real API, use:
    // const response = await apiClient.get('/transports');
    // return response.data;
  } catch (error) {
    console.error('Error fetching transports:', error);
    throw error;
  }
};

/**
 * Fetch single transport by ID
 */
export const fetchTransportById = async (id) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    const transport = mockData.find(item => item.id === id);
    return transport;
  } catch (error) {
    console.error('Error fetching transport:', error);
    throw error;
  }
};

/**
 * Mock login API call
 * In production, send credentials to backend
 */
export const loginAPI = async (username, password) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    // Simulate successful login
    return {
      user: { id: Date.now(), username, email: `${username}@gomate.com` },
      token: `token_${Date.now()}`,
    };
  } catch (error) {
    console.error('Login API error:', error);
    throw error;
  }
};

/**
 * Mock register API call
 */
export const registerAPI = async (username, email, password) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      user: { id: Date.now(), username, email },
      token: `token_${Date.now()}`,
    };
  } catch (error) {
    console.error('Register API error:', error);
    throw error;
  }
};

export default apiClient;
