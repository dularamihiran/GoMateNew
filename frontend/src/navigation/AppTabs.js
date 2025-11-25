import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeToggle';
import HomeScreen from '../features/transports/HomeScreen';
import DetailsScreen from '../features/transports/DetailsScreen';
import FavouritesScreen from '../features/transports/FavouritesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchPlanner from '../features/search/SearchPlanner';
import TrackingScreen from '../features/tracking/TrackingScreen';

/**
 * AppTabs Navigator
 * Bottom tab navigation for authenticated users
 * Includes Home, Favourites, and Profile tabs
 */
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Home Stack - includes Home and Details screens
const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen 
        name="Details" 
        component={DetailsScreen}
        options={{
          headerShown: true,
          headerTitle: 'Route Details',
        }}
      />
    </Stack.Navigator>
  );
};

// Favourites Stack - includes Favourites and Details screens
const FavouritesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="FavouritesMain" component={FavouritesScreen} />
      <Stack.Screen 
        name="Details" 
        component={DetailsScreen}
        options={{
          headerShown: true,
          headerTitle: 'Route Details',
        }}
      />
    </Stack.Navigator>
  );
};

// Search Stack - includes planner and details
const SearchStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SearchMain" component={SearchPlanner} />
      <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: true, headerTitle: 'Route Details' }} />
    </Stack.Navigator>
  );
};

// Tracking Stack - tracking main screen and details
const TrackingStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TrackingMain" component={TrackingScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: true, headerTitle: 'Route Details' }} />
    </Stack.Navigator>
  );
};

const AppTabs = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.tabBarActive,
        tabBarInactiveTintColor: theme.colors.tabBarInactive,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavouritesStack}
        options={{
          tabBarLabel: 'Favourites',
          tabBarIcon: ({ color, size }) => (
            <Feather name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Tracking"
        component={TrackingStack}
        options={{
          tabBarLabel: 'Tracking',
          tabBarIcon: ({ color, size }) => (
            <Feather name="map" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppTabs;
