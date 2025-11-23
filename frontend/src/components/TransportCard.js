import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeToggle';

/**
 * TransportCard Component
 * Displays a transport item with image, title, type, status, and time
 * Used in HomeScreen list
 */
const TransportCard = ({ transport, onPress, showFavouriteButton, onFavouritePress, isFavourite }) => {
  const { theme } = useTheme();

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
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Transport Image */}
      <Image
        source={{ uri: transport.image }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Content Container */}
      <View style={styles.content}>
        {/* Title and Favourite Button Row */}
        <View style={styles.headerRow}>
          <Text style={[styles.title, { color: theme.colors.text }]} numberOfLines={1}>
            {transport.title}
          </Text>
          {showFavouriteButton && (
            <TouchableOpacity onPress={onFavouritePress} style={styles.favouriteButton}>
              <Feather
                name={isFavourite ? 'heart' : 'heart'}
                size={20}
                color={isFavourite ? theme.colors.error : theme.colors.textSecondary}
                fill={isFavourite ? theme.colors.error : 'transparent'}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Type and Status Row */}
        <View style={styles.infoRow}>
          <View style={[styles.typeBadge, { backgroundColor: theme.colors.primary + '20' }]}>
            <Feather
              name={transport.type === 'Bus' ? 'truck' : 'aperture'}
              size={14}
              color={theme.colors.primary}
            />
            <Text style={[styles.typeText, { color: theme.colors.primary }]}>
              {transport.type}
            </Text>
          </View>

          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(transport.status) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(transport.status) }]}>
              {transport.status}
            </Text>
          </View>
        </View>

        {/* Time Row */}
        <View style={styles.timeRow}>
          <Feather name="clock" size={14} color={theme.colors.textSecondary} />
          <Text style={[styles.timeText, { color: theme.colors.textSecondary }]}>
            {transport.time}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    overflow: 'hidden',
    borderWidth: 1,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    padding: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  favouriteButton: {
    padding: 4,
    marginLeft: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 13,
    marginLeft: 6,
  },
});

export default TransportCard;
