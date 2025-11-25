import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeToggle';

/**
 * MapTracker.web.js
 * Web-specific fallback for MapTracker
 * Shows vehicle coordinates as text instead of rendering a map
 */
const MapTracker = ({ routeId, position }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <Text style={{ color: theme.colors.text, fontSize: 16, marginBottom: 8 }}>🗺️ Map View</Text>
      <Text style={{ color: theme.colors.textSecondary, textAlign: 'center', paddingHorizontal: 20 }}>
        Interactive maps are only available on mobile devices.
      </Text>
      {position && (
        <View style={{ marginTop: 16, padding: 12, backgroundColor: theme.colors.background, borderRadius: 8 }}>
          <Text style={{ color: theme.colors.text, fontWeight: '700' }}>Vehicle {routeId}</Text>
          <Text style={{ color: theme.colors.textSecondary }}>Latitude: {position.lat.toFixed(4)}</Text>
          <Text style={{ color: theme.colors.textSecondary }}>Longitude: {position.lng.toFixed(4)}</Text>
          <Text style={{ color: theme.colors.textSecondary, fontSize: 12, marginTop: 4 }}>
            Last updated: {new Date(position.lastUpdated).toLocaleTimeString()}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    height: 300, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderRadius: 8,
  },
});

export default MapTracker;
