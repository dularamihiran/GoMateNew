import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import transportReducer from '../features/transports/transportSlice';
import trackingReducer from '../features/tracking/trackingSlice';

/**
 * Redux Store Configuration
 * Combines all feature slices for global state management
 */
const store = configureStore({
  reducer: {
    auth: authReducer,
    transports: transportReducer,
    tracking: trackingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Needed for AsyncStorage actions
    }),
});

export default store;
