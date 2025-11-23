# GoMate - Travel & Transport Mobile App

A React Native (Expo) mobile application for viewing public transport schedules, exploring destinations, and managing favourite routes.

## Features

✅ **Authentication**: Login and Registration with Formik + Yup validation  
✅ **Transport Routes**: Browse buses, trains, and transport schedules  
✅ **Route Details**: View comprehensive information about each route  
✅ **Favourites**: Save and manage favourite routes (persisted with AsyncStorage)  
✅ **Dark Mode**: Toggle between light and dark themes  
✅ **Profile**: User profile with stats and settings  
✅ **Clean UI**: Modern design with Feather icons  
✅ **State Management**: Redux Toolkit with persistence  
✅ **Navigation**: React Navigation (Stack + Bottom Tabs)

## Tech Stack

- **Framework**: React Native (Expo)
- **Navigation**: React Navigation (Stack Navigator + Bottom Tabs)
- **State Management**: Redux Toolkit
- **Persistence**: AsyncStorage
- **Forms**: Formik + Yup
- **Icons**: Expo Vector Icons (Feather)
- **HTTP Client**: Axios

## Project Structure

```
frontend/
├── src/
│   ├── api/                    # API and mock data
│   │   ├── api.js
│   │   └── mockTransport.json
│   ├── components/             # Reusable components
│   │   ├── TransportCard.js
│   │   └── CustomButton.js
│   ├── features/               # Feature-based modules
│   │   ├── auth/
│   │   │   ├── authSlice.js
│   │   │   ├── LoginScreen.js
│   │   │   └── RegisterScreen.js
│   │   └── transports/
│   │       ├── transportSlice.js
│   │       ├── HomeScreen.js
│   │       ├── DetailsScreen.js
│   │       └── FavouritesScreen.js
│   ├── navigation/             # Navigation configuration
│   │   ├── AuthStack.js
│   │   ├── AppTabs.js
│   │   └── RootNavigator.js
│   ├── screens/                # Standalone screens
│   │   └── ProfileScreen.js
│   ├── store/                  # Redux store
│   │   └── store.js
│   └── theme/                  # Theme system
│       ├── lightTheme.js
│       ├── darkTheme.js
│       └── ThemeToggle.js
├── App.js                      # Entry point
├── package.json
└── app.json
```

## Installation

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npx expo start
   ```

4. **Run on device/emulator**:
   - Press `a` for Android
   - Press `i` for iOS
   - Scan QR code with Expo Go app

## Usage

### Authentication
- Register a new account or login with existing credentials
- Form validation ensures proper input
- Session persists across app restarts

### Browse Transports
- View all available transport routes on Home screen
- Each card shows route, type, status, and departure time
- Pull to refresh to reload data

### View Details
- Tap any transport card to see full details
- View route information, description, and schedule
- Add/remove from favourites

### Manage Favourites
- Access saved routes from Favourites tab
- Favourites persist using AsyncStorage
- Remove items by tapping the heart icon

### Profile & Settings
- View user information and statistics
- Toggle between light and dark mode
- Logout to return to authentication screen

## Mock Data

The app uses local JSON data in `src/api/mockTransport.json`. No backend is required. All transport information is loaded from this file.

## Key Libraries

- `@react-navigation/native` - Navigation
- `@react-navigation/stack` - Stack navigation
- `@react-navigation/bottom-tabs` - Tab navigation
- `@reduxjs/toolkit` - State management
- `react-redux` - Redux bindings
- `@react-native-async-storage/async-storage` - Local storage
- `axios` - HTTP client
- `formik` - Form handling
- `yup` - Form validation
- `@expo/vector-icons` - Icons

## Screenshots

*App includes:*
- Login/Register screens
- Home screen with transport list
- Details screen with full information
- Favourites screen
- Profile screen with dark mode toggle

## License

This is an educational project for assignment purposes.

---

**GoMate** - Your Travel Companion 🚌🚆
