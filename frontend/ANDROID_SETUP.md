# Android Setup Guide for GoMate

## Option 1: Using Physical Android Device (EASIEST)

### Steps:
1. **Install Expo Go on your Android phone**
   - Open Google Play Store
   - Search for "Expo Go"
   - Install the app

2. **Enable USB Debugging (if connecting via cable)**
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times to enable Developer Options
   - Go to Settings → Developer Options
   - Enable "USB Debugging"

3. **Connect to same WiFi network**
   - Make sure your phone and computer are on the same WiFi network

4. **Run the app**
   ```powershell
   cd E:\GoMateNew\frontend
   npx expo start -c
   ```

5. **Scan QR Code**
   - Open Expo Go app on your phone
   - Tap "Scan QR Code"
   - Scan the QR code from your terminal/browser

---

## Option 2: Using Android Emulator (Requires Android Studio)

### Prerequisites:
1. **Install Android Studio**
   - Download from: https://developer.android.com/studio
   - Run the installer
   - During setup, ensure "Android Virtual Device" is selected

2. **Install Android SDK**
   - Open Android Studio
   - Go to Tools → SDK Manager
   - Install Android SDK Platform 33 (or latest)
   - Install Android SDK Build-Tools
   - Install Android Emulator

3. **Create Virtual Device**
   - Open Android Studio
   - Go to Tools → Device Manager (or AVD Manager)
   - Click "Create Virtual Device"
   - Select "Pixel 5" or any phone
   - Select System Image (API 33 recommended)
   - Click Finish

4. **Set Environment Variables**
   ```powershell
   # Add to your system environment variables:
   ANDROID_HOME=C:\Users\YourUsername\AppData\Local\Android\Sdk
   
   # Add to PATH:
   %ANDROID_HOME%\platform-tools
   %ANDROID_HOME%\emulator
   %ANDROID_HOME%\tools
   %ANDROID_HOME%\tools\bin
   ```

5. **Start Emulator**
   ```powershell
   # Option A: From Android Studio
   # Open Device Manager → Click Play button on your virtual device
   
   # Option B: From Command Line
   emulator -avd Pixel_5_API_33
   ```

6. **Run App on Emulator**
   ```powershell
   cd E:\GoMateNew\frontend
   npx expo start -c
   # Press 'a' when prompted to open on Android
   ```

---

## Option 3: Run on Web Browser (NO ANDROID NEEDED)

### Fastest way to test your app:

```powershell
cd E:\GoMateNew\frontend
npx expo start -c
# Press 'w' to open in web browser
```

This opens the app in your default browser at `http://localhost:8081`

---

## Troubleshooting

### Error: "No Android device found"
- **Solution**: Use Option 1 (Physical Device) or Option 3 (Web Browser)
- Make sure Expo Go is installed and phone is on same WiFi

### Error: "Unable to connect to Metro"
- **Solution**: 
  ```powershell
  npx expo start -c --tunnel
  ```
- This creates a tunnel connection that works even with restrictive networks

### App shows blue screen
- **Solution**: 
  ```powershell
  cd E:\GoMateNew\frontend
  npx expo start -c
  # -c flag clears the cache
  ```

### Metro bundler issues
- **Solution**:
  ```powershell
  # Clear all caches
  rm -r node_modules
  rm -r .expo
  npm install
  npx expo start -c
  ```

---

## Quick Commands Reference

```powershell
# Clear cache and start
npx expo start -c

# Start with tunnel (for restrictive networks)
npx expo start --tunnel

# Open on Android (requires device/emulator)
npx expo start --android

# Open on web browser
npx expo start --web

# Clear Metro cache
npx expo start -c

# Reset project completely
rm -r node_modules; rm -r .expo; npm install; npx expo start -c
```

---

## Recommended: Start with Web Testing

For fastest development without Android setup:

```powershell
cd E:\GoMateNew\frontend
npx expo start
# Press 'w' in the terminal
```

Then set up Android later when needed for device-specific testing.
