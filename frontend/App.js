import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { ThemeProvider } from './src/theme/ThemeToggle';
import store from './src/store/store';
import RootNavigator from './src/navigation/RootNavigator';

/**
 * Main App Component
 * Sets up Redux store, theme provider, and navigation
 */
export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <RootNavigator />
        <StatusBar style="auto" />
      </ThemeProvider>
    </Provider>
  );
}
