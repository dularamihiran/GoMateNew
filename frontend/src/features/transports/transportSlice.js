import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchTransports } from '../../api/api';

/**
 * Transport Slice - Manages transport data and favourites
 * Persists favourites in AsyncStorage
 */
const transportSlice = createSlice({
  name: 'transports',
  initialState: {
    items: [],
    favourites: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Set all transport items
    setTransports: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
    // Set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // Set error
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // Add to favourites
    addFavourite: (state, action) => {
      const exists = state.favourites.find(item => item.id === action.payload.id);
      if (!exists) {
        state.favourites.push(action.payload);
      }
    },
    // Remove from favourites
    removeFavourite: (state, action) => {
      state.favourites = state.favourites.filter(item => item.id !== action.payload);
    },
    // Load favourites from AsyncStorage
    loadFavourites: (state, action) => {
      state.favourites = action.payload;
    },
  },
});

export const {
  setTransports,
  setLoading,
  setError,
  addFavourite,
  removeFavourite,
  loadFavourites,
} = transportSlice.actions;

// Thunk to fetch transports from API
export const getTransports = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const data = await fetchTransports();
    dispatch(setTransports(data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// Thunk to add favourite and persist to AsyncStorage
export const addToFavourites = (transport) => async (dispatch, getState) => {
  try {
    dispatch(addFavourite(transport));
    const { favourites } = getState().transports;
    await AsyncStorage.setItem('favourites', JSON.stringify(favourites));
  } catch (error) {
    console.error('Add favourite error:', error);
  }
};

// Thunk to remove favourite and update AsyncStorage
export const removeFromFavourites = (transportId) => async (dispatch, getState) => {
  try {
    dispatch(removeFavourite(transportId));
    const { favourites } = getState().transports;
    await AsyncStorage.setItem('favourites', JSON.stringify(favourites));
  } catch (error) {
    console.error('Remove favourite error:', error);
  }
};

// Thunk to load favourites from AsyncStorage on app start
export const loadFavouritesFromStorage = () => async (dispatch) => {
  try {
    const storedFavourites = await AsyncStorage.getItem('favourites');
    if (storedFavourites) {
      dispatch(loadFavourites(JSON.parse(storedFavourites)));
    }
  } catch (error) {
    console.error('Load favourites error:', error);
  }
};

export default transportSlice.reducer;
