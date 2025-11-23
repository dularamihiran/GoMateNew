import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeToggle';
import { getTransports, addToFavourites, removeFromFavourites } from './transportSlice';
import TransportCard from '../../components/TransportCard';

/**
 * HomeScreen Component
 * Displays list of available transport routes
 * Users can view details and add/remove favourites
 */
const HomeScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const { items, favourites, loading } = useSelector((state) => state.transports);

  // Load transports on mount
  useEffect(() => {
    dispatch(getTransports());
  }, [dispatch]);

  // Handle refresh
  const onRefresh = () => {
    dispatch(getTransports());
  };

  // Check if transport is in favourites
  const isFavourite = (transportId) => {
    return favourites.some((fav) => fav.id === transportId);
  };

  // Toggle favourite
  const handleFavouritePress = (transport) => {
    if (isFavourite(transport.id)) {
      dispatch(removeFromFavourites(transport.id));
    } else {
      dispatch(addToFavourites(transport));
    }
  };

  // Navigate to details
  const handleCardPress = (transport) => {
    navigation.navigate('Details', { transport });
  };

  // Render empty state
  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Feather name="inbox" size={60} color={theme.colors.textSecondary} />
      <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
        No transports available
      </Text>
    </View>
  );

  // Render transport item
  const renderItem = ({ item }) => (
    <TransportCard
      transport={item}
      onPress={() => handleCardPress(item)}
      showFavouriteButton
      onFavouritePress={() => handleFavouritePress(item)}
      isFavourite={isFavourite(item.id)}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card, borderBottomColor: theme.colors.border }]}>
        <View style={styles.headerContent}>
          <Feather name="map-pin" size={28} color={theme.colors.primary} />
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>GoMate</Text>
        </View>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          Explore Transport Routes
        </Text>
      </View>

      {/* Transport List */}
      {loading && items.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>
            Loading transports...
          </Text>
        </View>
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmpty}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={onRefresh}
              colors={[theme.colors.primary]}
              tintColor={theme.colors.primary}
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  headerSubtitle: {
    fontSize: 14,
    marginLeft: 40,
  },
  listContent: {
    paddingVertical: 8,
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
  },
});

export default HomeScreen;
