import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../theme/ThemeToggle';
import TransportCard from '../../components/TransportCard';
import MapTracker from '../../components/MapTracker';
import { getTransports } from '../transports/transportSlice';

/**
 * TrackingScreen
 * - Shows list of routes and allows user to select one to track in real-time
 * - Uses `MapTracker` component which polls the tracking API
 */
const TrackingScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.transports);
  const positions = useSelector((state) => state.tracking.positions);

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!items || items.length === 0) dispatch(getTransports());
  }, [dispatch]);

  const renderItem = ({ item }) => (
    <TransportCard
      transport={item}
      onPress={() => navigation.navigate('Details', { transport: item })}
      showFavouriteButton
      isFavourite={false}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.card, borderBottomColor: theme.colors.border }]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Tracking</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>Select a route then press Track Vehicle</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            {renderItem({ item })}
            <View style={styles.trackRow}>
              <TouchableOpacity style={[styles.trackButton, { backgroundColor: theme.colors.primary }]} onPress={() => setSelected(item)}>
                <Text style={{ color: '#fff', fontWeight: '700' }}>Track Vehicle</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
      />

      {selected && (
        <View style={styles.mapWrapper}>
          <Text style={[styles.trackingTitle, { color: theme.colors.text }]}>Tracking: {selected.title}</Text>
          <MapTracker routeId={selected.id} pollingInterval={5000} position={positions[selected.id]} />
          <TouchableOpacity style={[styles.stopButton, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]} onPress={() => setSelected(null)}>
            <Text style={{ color: theme.colors.primary }}>Stop Tracking</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingTop: 48, paddingBottom: 12, paddingHorizontal: 16, borderBottomWidth: 1 },
  title: { fontSize: 22, fontWeight: '700' },
  subtitle: { fontSize: 13, marginTop: 6 },
  trackRow: { paddingHorizontal: 24, marginBottom: 8 },
  trackButton: { padding: 12, borderRadius: 8, alignItems: 'center' },
  mapWrapper: { padding: 16, borderTopWidth: 1 },
  trackingTitle: { fontWeight: '700', marginBottom: 8 },
  stopButton: { padding: 10, borderRadius: 8, alignItems: 'center', marginTop: 8, borderWidth: 1 },
});

export default TrackingScreen;
