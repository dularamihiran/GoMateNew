import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeToggle';
import { addToFavourites, removeFromFavourites } from './transportSlice';
import CustomButton from '../../components/CustomButton';

/**
 * DetailsScreen Component
 * Shows full details of a selected transport route
 * Allows adding/removing from favourites
 */
const DetailsScreen = ({ route, navigation }) => {
  const { transport } = route.params;
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const { favourites } = useSelector((state) => state.transports);

  // Check if current transport is in favourites
  const isFavourite = favourites.some((fav) => fav.id === transport.id);

  // Toggle favourite
  const handleToggleFavourite = () => {
    if (isFavourite) {
      dispatch(removeFromFavourites(transport.id));
    } else {
      dispatch(addToFavourites(transport));
    }
  };

  // Status color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return theme.colors.success;
      case 'Limited':
        return theme.colors.warning;
      case 'Weekend Only':
        return theme.colors.secondary;
      default:
        return theme.colors.textSecondary;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView>
        {/* Transport Image */}
        <Image
          source={{ uri: transport.image }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Content */}
        <View style={styles.content}>
          {/* Title and Favourite Button */}
          <View style={styles.titleRow}>
            <Text style={[styles.title, { color: theme.colors.text }]}>
              {transport.title}
            </Text>
            <TouchableOpacity onPress={handleToggleFavourite} style={styles.favouriteButton}>
              <Feather
                name="heart"
                size={28}
                color={isFavourite ? theme.colors.error : theme.colors.textSecondary}
                fill={isFavourite ? theme.colors.error : 'transparent'}
              />
            </TouchableOpacity>
          </View>

          {/* Info Cards */}
          <View style={styles.infoGrid}>
            {/* Type Card */}
            <View style={[styles.infoCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
              <Feather
                name={transport.type === 'Bus' ? 'truck' : 'aperture'}
                size={24}
                color={theme.colors.primary}
              />
              <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Type</Text>
              <Text style={[styles.infoValue, { color: theme.colors.text }]}>{transport.type}</Text>
            </View>

            {/* Time Card */}
            <View style={[styles.infoCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
              <Feather name="clock" size={24} color={theme.colors.primary} />
              <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Time</Text>
              <Text style={[styles.infoValue, { color: theme.colors.text }]}>{transport.time}</Text>
            </View>
          </View>

          {/* Status Badge */}
          <View style={styles.statusContainer}>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(transport.status) + '20' }]}>
              <Feather name="info" size={18} color={getStatusColor(transport.status)} />
              <Text style={[styles.statusText, { color: getStatusColor(transport.status) }]}>
                {transport.status}
              </Text>
            </View>
          </View>

          {/* Description Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Feather name="file-text" size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Description</Text>
            </View>
            <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
              {transport.description}
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <CustomButton
              title={isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
              onPress={handleToggleFavourite}
              variant={isFavourite ? 'secondary' : 'primary'}
              style={styles.actionButton}
            />
            <CustomButton
              title="Book Now"
              onPress={() => {/* Booking functionality */}}
              style={styles.actionButton}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 12,
  },
  favouriteButton: {
    padding: 4,
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  infoCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    marginTop: 8,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
  statusContainer: {
    marginBottom: 24,
    alignItems: 'flex-start',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
  },
  actions: {
    gap: 12,
  },
  actionButton: {
    marginBottom: 8,
  },
});

export default DetailsScreen;
