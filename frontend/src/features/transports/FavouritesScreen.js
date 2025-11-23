import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeToggle';
import { removeFromFavourites } from './transportSlice';
import TransportCard from '../../components/TransportCard';

/**
 * FavouritesScreen Component
 * Displays user's saved favourite transport routes
 * Data persisted in AsyncStorage via Redux
 */
const FavouritesScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const { favourites } = useSelector((state) => state.transports);

  // Handle favourite removal
  const handleRemoveFavourite = (transportId) => {
    dispatch(removeFromFavourites(transportId));
  };

  // Navigate to details
  const handleCardPress = (transport) => {
    navigation.navigate('Details', { transport });
  };

  // Render empty state
  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Feather name="heart" size={80} color={theme.colors.textSecondary} />
      <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
        No Favourites Yet
      </Text>
      <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
        Add transport routes to your favourites to see them here
      </Text>
    </View>
  );

  // Render transport item
  const renderItem = ({ item }) => (
    <TransportCard
      transport={item}
      onPress={() => handleCardPress(item)}
      showFavouriteButton
      onFavouritePress={() => handleRemoveFavourite(item.id)}
      isFavourite={true}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card, borderBottomColor: theme.colors.border }]}>
        <View style={styles.headerContent}>
          <Feather name="heart" size={28} color={theme.colors.error} />
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Favourites</Text>
        </View>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          {favourites.length} {favourites.length === 1 ? 'route' : 'routes'} saved
        </Text>
      </View>

      {/* Favourites List */}
      <FlatList
        data={favourites}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmpty}
      />
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default FavouritesScreen;
