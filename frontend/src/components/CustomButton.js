import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../theme/ThemeToggle';

/**
 * CustomButton Component
 * Reusable button with primary/secondary variants
 * Supports loading state and disabled state
 */
const CustomButton = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
}) => {
  const { theme } = useTheme();

  const isPrimary = variant === 'primary';
  const isDisabled = disabled || loading;

  const buttonStyle = [
    styles.button,
    {
      backgroundColor: isPrimary ? theme.colors.primary : 'transparent',
      borderColor: theme.colors.primary,
      borderWidth: isPrimary ? 0 : 1,
      opacity: isDisabled ? 0.6 : 1,
    },
    style,
  ];

  const textStyle = [
    styles.text,
    {
      color: isPrimary ? '#FFFFFF' : theme.colors.primary,
    },
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? '#FFFFFF' : theme.colors.primary} />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomButton;
