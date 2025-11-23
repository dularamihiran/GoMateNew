import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Auth Slice - Manages user authentication state
 * Persists user data and token in AsyncStorage
 */
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
  },
  reducers: {
    // Login action - saves user and token
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
    },
    // Register action - saves new user
    registerSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
    },
    // Logout action - clears state
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    // Restore session from AsyncStorage
    restoreSession: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { loginSuccess, registerSuccess, logout, restoreSession, setLoading } = authSlice.actions;

// Thunk to persist login to AsyncStorage
export const login = (username, password) => async (dispatch) => {
  try {
    // Simulate API call - In real app, validate against backend
    const mockUser = {
      id: Date.now(),
      username,
      email: `${username}@gomate.com`,
    };
    const mockToken = `token_${Date.now()}`;

    // Save to AsyncStorage
    await AsyncStorage.setItem('user', JSON.stringify(mockUser));
    await AsyncStorage.setItem('token', mockToken);

    dispatch(loginSuccess({ user: mockUser, token: mockToken }));
  } catch (error) {
    console.error('Login error:', error);
  }
};

// Thunk to persist registration to AsyncStorage
export const register = (username, email, password) => async (dispatch) => {
  try {
    // Simulate API call
    const mockUser = {
      id: Date.now(),
      username,
      email,
    };
    const mockToken = `token_${Date.now()}`;

    // Save to AsyncStorage
    await AsyncStorage.setItem('user', JSON.stringify(mockUser));
    await AsyncStorage.setItem('token', mockToken);

    dispatch(registerSuccess({ user: mockUser, token: mockToken }));
  } catch (error) {
    console.error('Register error:', error);
  }
};

// Thunk to logout and clear AsyncStorage
export const logoutUser = () => async (dispatch) => {
  try {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
    dispatch(logout());
  } catch (error) {
    console.error('Logout error:', error);
  }
};

// Thunk to restore session on app start
export const loadSession = () => async (dispatch) => {
  try {
    const user = await AsyncStorage.getItem('user');
    const token = await AsyncStorage.getItem('token');

    if (user && token) {
      dispatch(restoreSession({ user: JSON.parse(user), token }));
    }
  } catch (error) {
    console.error('Load session error:', error);
  }
};

export default authSlice.reducer;
