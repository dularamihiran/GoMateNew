import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '../../theme/ThemeToggle';
import { useDispatch, useSelector } from 'react-redux';
import TransportCard from '../../components/TransportCard';
import { getTransports } from '../transports/transportSlice';

/**
 * SearchPlanner Screen
 * - Lets users enter start/end locations and shows matching routes
 * - Uses mock transports from the store (loaded on mount)
 */
const SearchPlanner = ({ navigation }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.transports);

  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!items || items.length === 0) dispatch(getTransports());
  }, [dispatch]);

  const planTrip = () => {
    // Very simple matching: compare start/end against title like 'Colombo → Kandy'
    const s = start.trim().toLowerCase();
    const e = end.trim().toLowerCase();

    if (!s && !e) {
      setResults([]);
      return;
    }

    const matched = items.filter((it) => {
      const parts = it.title.split('→').map(p => p.trim().toLowerCase());
      if (s && e) return parts[0]?.includes(s) && parts[1]?.includes(e);
      if (s) return parts[0]?.includes(s) || parts[1]?.includes(s);
      if (e) return parts[0]?.includes(e) || parts[1]?.includes(e);
      return false;
    });

    setResults(matched);
  };

  const handleCardPress = (transport) => {
    navigation.navigate('Details', { transport });
  };

  const renderItem = ({ item }) => (
    <TransportCard
      transport={item}
      onPress={() => handleCardPress(item)}
      showFavouriteButton
      isFavourite={false}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.card, borderBottomColor: theme.colors.border }]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Trip Planner</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>Enter start and end locations</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          placeholder="Start (e.g. Colombo)"
          placeholderTextColor={theme.colors.textSecondary}
          style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
          value={start}
          onChangeText={setStart}
        />

        <TextInput
          placeholder="End (e.g. Kandy)"
          placeholderTextColor={theme.colors.textSecondary}
          style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
          value={end}
          onChangeText={setEnd}
        />

        <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.primary }]} onPress={planTrip}>
          <Text style={[styles.buttonText, { color: '#fff' }]}>Plan Trip</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListEmptyComponent={() => (
          <View style={styles.empty}><Text style={{ color: theme.colors.textSecondary }}>No matching routes — try broadening your search.</Text></View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingTop: 48, paddingBottom: 12, paddingHorizontal: 16, borderBottomWidth: 1 },
  title: { fontSize: 22, fontWeight: '700' },
  subtitle: { fontSize: 13, marginTop: 6 },
  form: { padding: 16 },
  input: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
  button: { padding: 14, borderRadius: 8, alignItems: 'center' },
  buttonText: { fontWeight: '700' },
  empty: { padding: 24, alignItems: 'center' },
});

export default SearchPlanner;
