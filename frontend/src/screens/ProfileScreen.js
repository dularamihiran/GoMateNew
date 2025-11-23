import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeToggle';
import { logoutUser } from '../features/auth/authSlice';
import CustomButton from '../components/CustomButton';

/**
 * ProfileScreen Component
 * Shows user information, settings, and logout
 * Includes dark mode toggle
 */
const ProfileScreen = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { favourites } = useSelector((state) => state.transports);

  // Handle logout
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
          <View style={[styles.avatarContainer, { backgroundColor: theme.colors.primary }]}>
            <Feather name="user" size={50} color="#FFFFFF" />
          </View>
          <Text style={[styles.username, { color: theme.colors.text }]}>
            {user?.username || 'Guest User'}
          </Text>
          <Text style={[styles.email, { color: theme.colors.textSecondary }]}>
            {user?.email || 'guest@gomate.com'}
          </Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <Feather name="heart" size={32} color={theme.colors.error} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>
              {favourites.length}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              Favourites
            </Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <Feather name="map-pin" size={32} color={theme.colors.primary} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>
              {user ? '🟢 Active' : '⚫ Inactive'}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              Status
            </Text>
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Settings</Text>

          {/* Dark Mode Toggle */}
          <View style={[styles.settingItem, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <View style={styles.settingLeft}>
              <Feather
                name={isDarkMode ? 'moon' : 'sun'}
                size={22}
                color={theme.colors.primary}
              />
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: theme.colors.text }]}>
                  Dark Mode
                </Text>
                <Text style={[styles.settingSubtitle, { color: theme.colors.textSecondary }]}>
                  {isDarkMode ? 'Enabled' : 'Disabled'}
                </Text>
              </View>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: theme.colors.border, true: theme.colors.primary + '50' }}
              thumbColor={isDarkMode ? theme.colors.primary : theme.colors.textSecondary}
            />
          </View>

          {/* Notifications (Mock) */}
          <TouchableOpacity style={[styles.settingItem, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <View style={styles.settingLeft}>
              <Feather name="bell" size={22} color={theme.colors.primary} />
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: theme.colors.text }]}>
                  Notifications
                </Text>
                <Text style={[styles.settingSubtitle, { color: theme.colors.textSecondary }]}>
                  Manage notification preferences
                </Text>
              </View>
            </View>
            <Feather name="chevron-right" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          {/* Language (Mock) */}
          <TouchableOpacity style={[styles.settingItem, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <View style={styles.settingLeft}>
              <Feather name="globe" size={22} color={theme.colors.primary} />
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: theme.colors.text }]}>
                  Language
                </Text>
                <Text style={[styles.settingSubtitle, { color: theme.colors.textSecondary }]}>
                  English (Default)
                </Text>
              </View>
            </View>
            <Feather name="chevron-right" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>About</Text>

          <TouchableOpacity style={[styles.settingItem, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <View style={styles.settingLeft}>
              <Feather name="info" size={22} color={theme.colors.primary} />
              <Text style={[styles.settingTitle, { color: theme.colors.text }]}>
                Version
              </Text>
            </View>
            <Text style={[styles.versionText, { color: theme.colors.textSecondary }]}>
              1.0.0
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingItem, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <View style={styles.settingLeft}>
              <Feather name="file-text" size={22} color={theme.colors.primary} />
              <Text style={[styles.settingTitle, { color: theme.colors.text }]}>
                Terms & Privacy
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <CustomButton
            title="Logout"
            onPress={handleLogout}
            variant="secondary"
            style={styles.logoutButton}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 12,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  versionText: {
    fontSize: 14,
  },
  logoutContainer: {
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 40,
  },
  logoutButton: {
    borderColor: '#EF5350',
  },
});

export default ProfileScreen;
