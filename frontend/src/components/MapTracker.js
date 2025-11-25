import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import trackingApi from '../api/trackingApi';
import { setPosition } from '../features/tracking/trackingSlice';
import { useTheme } from '../theme/ThemeToggle';

/**
 * MapTracker
 * - Shows a MapView and a Marker for a routeId
 * - Polls the tracking API every few seconds and updates the Redux store
 * - Requires `react-native-maps` (install via `expo install react-native-maps`)
 */
const MapTracker = ({ routeId, pollingInterval = 5000 }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const positions = useSelector((s) => s.tracking.positions || {});
  const current = positions[routeId];

  const [loading, setLoading] = useState(!current);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    const fetchAndUpdate = async () => {
      try {
        const pos = await trackingApi.fetchVehicleLocation(routeId);
        if (!mounted.current) return;
        dispatch(setPosition({ routeId, lat: pos.lat, lng: pos.lng }));
        setLoading(false);
      } catch (err) {
        // ignore — API wrapper provides fallback
      }
    };

    // initial fetch
    fetchAndUpdate();

    // polling
    const id = setInterval(fetchAndUpdate, pollingInterval);
    return () => { mounted.current = false; clearInterval(id); };
  }, [routeId]);

  if (!current && loading) {
    return (
      <View style={[styles.loader, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={{ color: theme.colors.textSecondary, marginTop: 8 }}>Locating vehicle...</Text>
      </View>
    );
  }

  const region = {
    latitude: current?.lat || 6.9271,
    longitude: current?.lng || 79.8612,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <MapView style={styles.map} initialRegion={region} region={region}>
      {current && (
        <Marker coordinate={{ latitude: current.lat, longitude: current.lng }} title={`Vehicle ${routeId}`} />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: { width: '100%', height: 300 },
  loader: { height: 300, alignItems: 'center', justifyContent: 'center' },
});

export default MapTracker;
