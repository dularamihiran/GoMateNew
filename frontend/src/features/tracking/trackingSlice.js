import { createSlice } from '@reduxjs/toolkit';

/**
 * trackingSlice
 * Stores latest known positions for vehicle routes keyed by routeId
 */
const slice = createSlice({
  name: 'tracking',
  initialState: {
    positions: {}, // { [routeId]: { lat, lng, lastUpdated } }
    loading: false,
    error: null,
  },
  reducers: {
    setPosition: (state, action) => {
      const { routeId, lat, lng } = action.payload;
      state.positions[routeId] = { lat, lng, lastUpdated: Date.now() };
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setPosition, setLoading, setError } = slice.actions;
export default slice.reducer;
