import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeToggle';
import { login } from './authSlice';
import CustomButton from '../../components/CustomButton';

/**
 * LoginScreen Component
 * Handles user authentication with Formik validation
 */
const LoginScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  // Validation schema using Yup
  const loginValidationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .required('Username is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  // Handle login submission
  const handleLogin = async (values, { setSubmitting }) => {
    try {
      await dispatch(login(values.username, values.password));
      // Navigation is handled by RootNavigator based on auth state
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Feather name="map-pin" size={60} color={theme.colors.primary} />
          <Text style={[styles.title, { color: theme.colors.text }]}>Welcome to GoMate</Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Your travel companion
          </Text>
        </View>

        {/* Login Form */}
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={loginValidationSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
            <View style={styles.form}>
              {/* Username Input */}
              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: theme.colors.text }]}>Username</Text>
                <View style={[styles.inputWrapper, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
                  <Feather name="user" size={20} color={theme.colors.textSecondary} />
                  <TextInput
                    style={[styles.input, { color: theme.colors.text }]}
                    placeholder="Enter your username"
                    placeholderTextColor={theme.colors.textSecondary}
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                    autoCapitalize="none"
                  />
                </View>
                {touched.username && errors.username && (
                  <Text style={[styles.errorText, { color: theme.colors.error }]}>
                    {errors.username}
                  </Text>
                )}
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: theme.colors.text }]}>Password</Text>
                <View style={[styles.inputWrapper, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
                  <Feather name="lock" size={20} color={theme.colors.textSecondary} />
                  <TextInput
                    style={[styles.input, { color: theme.colors.text }]}
                    placeholder="Enter your password"
                    placeholderTextColor={theme.colors.textSecondary}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry
                    autoCapitalize="none"
                  />
                </View>
                {touched.password && errors.password && (
                  <Text style={[styles.errorText, { color: theme.colors.error }]}>
                    {errors.password}
                  </Text>
                )}
              </View>

              {/* Login Button */}
              <CustomButton
                title="Login"
                onPress={handleSubmit}
                loading={isSubmitting}
                style={styles.button}
              />

              {/* Register Link */}
              <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                style={styles.registerLink}
              >
                <Text style={[styles.registerText, { color: theme.colors.textSecondary }]}>
                  Don't have an account?{' '}
                  <Text style={{ color: theme.colors.primary, fontWeight: '600' }}>Register</Text>
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    marginTop: 8,
  },
  registerLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
  },
});

export default LoginScreen;
