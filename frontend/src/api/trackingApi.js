/**
 * trackingApi.js
 * Small wrapper to call a vehicle tracking API using provided key.
 * If the real API is not available, the function falls back to a mock coordinate.
 */
import axios from 'axios';

const TRACKING_API_KEY = '3907ce03-6d2b-4063-ae4c-f8bc1790107e';

// Example endpoint — replace with real provider endpoint if available
const BASE = 'https://api.vehicle-tracking.example.com';

// Helper: fetch vehicle location for a routeId
export const fetchVehicleLocation = async (routeId) => {
  try {
    // Build a realistic request (adjust when you have a real endpoint)
    const url = `${BASE}/positions?api_key=${TRACKING_API_KEY}&routeId=${routeId}`;
    const resp = await axios.get(url, { timeout: 4000 });
    // Expect an object { lat, lng } or { position: { lat, lng } }
    if (resp?.data) {
      if (resp.data.lat && resp.data.lng) return { lat: resp.data.lat, lng: resp.data.lng };
      if (resp.data.position) return { lat: resp.data.position.lat, lng: resp.data.position.lng };
    }
  } catch (err) {
    // If network fails or endpoint not present, fall through to mocked data
    // console.warn('Tracking API fetch failed:', err.message);
  }

  // Mock fallback: produce a deterministic pseudo-random location near Colombo
  const baseLat = 6.9271; // Colombo
  const baseLng = 79.8612;
  const jitter = (parseInt(routeId, 10) % 10) * 0.01;
  return { lat: baseLat + jitter, lng: baseLng + jitter };
};

export default { fetchVehicleLocation };
