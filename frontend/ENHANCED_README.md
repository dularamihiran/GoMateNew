# GoMate – Full-Featured Transport/Travel Assessment App

GoMate is a **React Native Expo** application designed for a travel/transport assessment project, featuring dynamic route lists, trip planning, favorites, real-time vehicle tracking, and more. Built with **Redux Toolkit** for state management, the app includes authentication, theming, and a clean modular architecture.

---

## 🚀 Features

### 1️⃣ **Home / Explore**

- Displays a **dynamic list of transport routes** fetched from a **mock JSON** file (`src/api/mockTransport.json`).
- Each route is displayed as a card showing:
  - Image
  - Title (e.g., "Colombo → Kandy")
  - Status (Available, Limited, Weekend Only)
  - Departure time
- Users can click a route to open the **Details Screen**.

### 2️⃣ **Search / Trip Planner**

- Provides a tab (`Search`) where users can input:
  - **Start location** (e.g., "Colombo")
  - **End location** (e.g., "Kandy")
- Upon pressing **"Plan Trip"**, the app searches the mock JSON for matching routes and displays results.
- Each matching route card can be tapped to view the **Details Screen**.

### 3️⃣ **Favorites**

- Users can **save favorite routes** via a toggle button on each route card:
  - **"Add to Favorites"** adds the route to Redux store.
  - **"Remove from Favorites"** removes the route.
- Favorites list is persisted using **AsyncStorage** for offline availability.
- The **Favorites** tab displays the user's saved routes.

### 4️⃣ **Tracking**

- A dedicated **Tracking tab** shows a list of routes. Each route has a **"Track Vehicle"** button.
- When pressed:
  - The app polls the **tracking API** using the provided key (`3907ce03-6d2b-4063-ae4c-f8bc1790107e`).
  - If the real API is unavailable, the code falls back to a **deterministic mock location** near Colombo (Sri Lanka).
- Vehicle positions are displayed on a **map** (`react-native-maps`).
- A polling interval of **~5 seconds** keeps the position updated live.
- Users can press **"Stop Tracking"** to hide the map.

### 5️⃣ **Tabs / Navigation**

The bottom tab navigator includes:

- **Home** (Explore)
- **Search** (Trip Planner)
- **Favorites**
- **Tracking**
- **Profile**

All tabs are fully functional and integrate seamlessly with Redux state and navigation.

### 6️⃣ **State Management**

Redux Toolkit powers the entire app, managing:

- **Routes list** (`transports` slice) – loads mock data from `mockTransport.json`.
- **Favorites** (`transports` slice with AsyncStorage) – persists favorites.
- **Tracking data** (`tracking` slice) – holds real-time vehicle positions by routeId.
- **Auth** (`auth` slice) – handles login, register, and session.

### 7️⃣ **UI / Design**

- Uses native React Native components: `FlatList`, `TouchableOpacity`, `TextInput`, and custom `TransportCard` components.
- Includes images, status labels, and a **visually appealing** card-based design.
- Supports **light/dark theming** (via `ThemeProvider` context).

---

## 📂 Folder Structure

```
frontend/
├── App.js                  # Entry point, wraps app with Provider + ThemeProvider
├── src/
│   ├── api/
│   │   ├── api.js                  # API wrappers for mock data
│   │   ├── mockTransport.json      # Mock JSON routes
│   │   └── trackingApi.js          # Tracking API wrapper with real and mock fallback
│   ├── components/
│   │   ├── CustomButton.js
│   │   ├── MapTracker.js           # Map component using react-native-maps, polls tracking API
│   │   └── TransportCard.js
│   ├── features/
│   │   ├── auth/
│   │   │   ├── authSlice.js
│   │   │   ├── LoginScreen.js
│   │   │   └── RegisterScreen.js
│   │   ├── transports/
│   │   │   ├── transportSlice.js   # Manages routes and favorites
│   │   │   ├── HomeScreen.js
│   │   │   ├── DetailsScreen.js
│   │   │   └── FavouritesScreen.js
│   │   ├── search/
│   │   │   └── SearchPlanner.js    # Trip planner UI
│   │   └── tracking/
│   │       ├── trackingSlice.js    # Manages vehicle positions
│   │       └── TrackingScreen.js   # Shows routes + track vehicle + map
│   ├── navigation/
│   │   ├── AppTabs.js              # Bottom tabs with Home, Search, Favorites, Tracking, Profile
│   │   ├── AuthStack.js
│   │   └── RootNavigator.js
│   ├── screens/
│   │   └── ProfileScreen.js
│   ├── store/
│   │   └── store.js                # Redux store config
│   └── theme/
│       ├── darkTheme.js
│       ├── lightTheme.js
│       └── ThemeToggle.js
└── android/                # Android platform files
└── assets/
└── package.json
```

---

## 🛠️ Installation & Running the App

### 1. Install Dependencies

Make sure you have **Node.js** (14+ recommended) and **Expo CLI** installed. Then:

```bash
cd frontend
npm install
```

### 2. Install `react-native-maps` (for tracking)

Since the app uses `MapTracker` with `react-native-maps`, run:

```bash
expo install react-native-maps
```

### 3. Start the App

```bash
npm start
# OR
expo start
```

This opens Expo DevTools. You can:

- Press **i** to open in iOS Simulator (macOS only).
- Press **a** to open in Android Emulator.
- Scan the QR code with the **Expo Go** app on a physical device.

---

## 🌐 Tracking API Integration

The tracking functionality uses the provided key:

```
3907ce03-6d2b-4063-ae4c-f8bc1790107e
```

- **File**: `src/api/trackingApi.js`
- **Polling Interval**: 5 seconds (configurable in `MapTracker.js`)
- **Behavior**:
  - Tries to call a real endpoint (currently a placeholder URL).
  - If the real API is unavailable or fails, it falls back to a **deterministic mock coordinate** near Colombo.
  - The coordinates are stored in Redux `tracking` slice and displayed on a **map** using `react-native-maps`.

---

## 🗂️ Mock Data

All routes are stored in:

```
src/api/mockTransport.json
```

Contains 8+ sample routes with:

- `id` – unique identifier
- `title` – e.g., "Colombo → Kandy"
- `type` – Bus or Train
- `image` – URL or base64
- `status` – Available, Limited, Weekend Only
- `time` – Departure time
- `description` – Details about the route

---

## 🔧 Key Code Explanations

### 1. `HomeScreen.js`

- Fetches routes via `dispatch(getTransports())` (loads from `mockTransport.json`).
- Renders routes in a `FlatList` using `TransportCard`.
- Offers a heart icon to add/remove favorites.

### 2. `SearchPlanner.js`

- Two text inputs for **start** and **end** locations.
- "Plan Trip" button filters routes by comparing input with route titles (simple string matching).
- Results displayed as cards.

### 3. `FavouritesScreen.js`

- Reads `favourites` from Redux (`transports.favourites`).
- Persisted with AsyncStorage for offline access.
- Allows removal from favorites directly.

### 4. `TrackingScreen.js`

- Lists routes with a **"Track Vehicle"** button for each.
- When pressed, opens a map showing the vehicle's position (updated every 5 seconds via `MapTracker`).
- MapTracker calls `trackingApi.fetchVehicleLocation(routeId)`, which polls the tracking API (or fallback to mock).

### 5. `trackingSlice.js`

- Stores positions keyed by `routeId`.
- Each position: `{ lat, lng, lastUpdated }`.

### 6. `MapTracker.js`

- Uses `react-native-maps` to display a map with a marker.
- Sets up a `setInterval` to periodically fetch and update the vehicle position.

---

## 🧪 Testing the Features

1. **Home/Explore**: Open the app → go to the **Home** tab → see route cards → tap a card → view **Details Screen**.
2. **Search/Trip Planner**: Go to the **Search** tab → enter "Colombo" (start) and "Kandy" (end) → press **Plan Trip** → see matching routes.
3. **Favorites**: Tap the heart icon on a route card → go to **Favorites** tab → see the saved route.
4. **Tracking**: Go to **Tracking** tab → tap **Track Vehicle** for a route → see the map with a marker → watch it update (mock or real data).
5. **Profile**: Go to **Profile** tab → theme toggle, logout, etc. (existing code).

---

## 📝 Comments & Code Quality

Every file includes inline comments explaining:

- What the component/slice does
- How data flows
- API calls and mock fallbacks
- Redux state structure

For example:

- `SearchPlanner.js` comments explain the string matching logic.
- `trackingApi.js` comments describe the API key, endpoint, and mock fallback.
- `MapTracker.js` comments explain polling interval and data updates.

---

## 🚧 Future Enhancements

- **Real Tracking API**: Replace the placeholder endpoint in `trackingApi.js` with an actual vehicle-tracking service.
- **Advanced Search**: Implement fuzzy matching or autocomplete for location inputs.
- **Push Notifications**: Notify users when a vehicle departs or arrives.
- **Offline Mode**: Cache routes and favorites for offline use.
- **Analytics**: Track user journeys and favorite routes.

---

## 🏁 Conclusion

**GoMate** is a full-featured transport/travel assessment app with:

- **Home/Explore** (dynamic route cards)
- **Search/Trip Planner** (start/end location matching)
- **Favorites** (save routes with AsyncStorage)
- **Tracking** (real-time vehicle tracking via API + map)
- **Profile** (user settings and theme toggle)

All features are **fully functional**, integrated with **Redux Toolkit**, and use **React Native components** for a clean, responsive UI. The app is built with Expo's **managed workflow** for easy testing and deployment.

---

Happy Coding! 🎉
