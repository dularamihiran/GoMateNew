import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../theme/ThemeToggle';
import { loadSession } from '../features/auth/authSlice';
import { loadFavouritesFromStorage } from '../features/transports/transportSlice';
import AuthStack from './AuthStack';
import AppTabs from './AppTabs';

/**
 * RootNavigator Component
 * Handles conditional navigation based on authentication state
 * Shows AuthStack if not authenticated, AppTabs if authenticated
 */
const RootNavigator = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Load persisted session and favourites on mount
  useEffect(() => {
    dispatch(loadSession());
    dispatch(loadFavouritesFromStorage());
  }, [dispatch]);

  // Navigation theme
  const navigationTheme = {
    dark: theme.dark,
    colors: {
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.card,
      text: theme.colors.text,
      border: theme.colors.border,
      notification: theme.colors.notification,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      {isAuthenticated ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
