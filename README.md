
# React Native Project README

## Project Overview

This project is a cross-platform mobile application built using React Native. Below are detailed instructions to set up, run, build, and distribute the application for both Android and iOS platforms.

---

## Prerequisites

Ensure your system meets the following requirements before proceeding:

1. **Node.js**: Version `16.x.x` or later ([Download Node.js](https://nodejs.org/)).
2. **npm** (comes with Node.js) or **Yarn**.
3. **Java Development Kit (JDK)**: Version `11` ([Download JDK](https://www.oracle.com/java/technologies/javase-downloads.html)).
4. **Android Studio**: ([Download Android Studio](https://developer.android.com/studio)).
5. **Xcode**: Available on macOS ([Download Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12)).

---

## Installation

### Step 1: Install React Native CLI
Install the React Native CLI globally:
```bash
npm install -g react-native-cli
```

### Step 2: Clone the Repository
Clone this project to your local machine:
```bash
git clone <repository-url>
cd <project-directory>
```

### Step 3: Install Dependencies
Install all necessary dependencies:
```bash
npm install
# or
yarn install
```

---

## Running the Project

### Android
1. Open **Android Studio** and ensure your Android Emulator is running, or connect a physical device with **USB Debugging** enabled.
2. Run the project:
   ```bash
   npx react-native run-android
   ```

### iOS
1. Install CocoaPods dependencies:
   ```bash
   cd ios
   pod install
   cd ..
   ```
2. Run the project:
   ```bash
   npx react-native run-ios
   ```

3. Alternatively, open `ios/<project-name>.xcworkspace` in Xcode:
   - Select your device/simulator from the top menu.
   - Press **Cmd + R** to build and run the app.

---

## Building the Project

### Android Release APK
1. Navigate to the `android` folder:
   ```bash
   cd android
   ```
2. Build the release APK:
   ```bash
   ./gradlew assembleRelease
   ```
3. The APK will be located in `android/app/build/outputs/apk/release/`.

---

### Android Release Bundle (AAB)
1. Navigate to the `android` folder:
   ```bash
   cd android
   ```
2. Build the release bundle:
   ```bash
   ./gradlew bundleRelease
   ```
3. The AAB file will be located in `android/app/build/outputs/bundle/release/`.

---

### iOS Release Build (IPA)
1. Open the Xcode project:
   ```bash
   open ios/<project-name>.xcworkspace
   ```
2. Select **Any iOS Device (arm64)** as the target device.
3. Go to **Product > Archive**.
4. Use the **Organizer** window to export the IPA:
   - Select **Distribute App** and follow the prompts.

---

## App Distribution

### Android Distribution
1. Upload the AAB file to the [Google Play Console](https://play.google.com/console).
2. Set up the app's details (name, description, graphics, etc.).
3. Complete the **App Content** section:
   - Add privacy policy.
   - Fill out questionnaires for data safety, content ratings, etc.
4. Review and publish your app.

For detailed guidance, refer to [Google Play's official documentation](https://support.google.com/googleplay/android-developer/answer/9859152).

---

### iOS Distribution
1. Ensure your Apple Developer account is set up ([Apple Developer Program](https://developer.apple.com/programs/)).
2. In Xcode, go to **Product > Archive**.
3. Use the **Organizer** to upload the build:
   - Select **Distribute App** and follow the steps.
   - Upload to **App Store Connect**.
4. On [App Store Connect](https://appstoreconnect.apple.com/), set up your app details:
   - Fill out the app information.
   - Add app screenshots, description, and keywords.
5. Submit the app for review.

For more details, see [App Store Connect Help](https://help.apple.com/app-store-connect/).

---

## Troubleshooting

### Common Issues
1. **Android Emulator Not Detected**:
   - Ensure your emulator is running or connect a physical device.
   - Run `adb devices` to check if your device is listed.
2. **iOS Build Fails**:
   - Verify you have the correct Xcode version.
   - Check for missing dependencies using `pod install`.

---

## Additional Notes

1. **Environment Variables**:
   - Ensure any `.env` files are properly configured.
   - Refer to the project documentation for the required variables.
2. **Android Signing Configuration**:
   - Place your `keystore` file in the `android/app` directory.
   - Update the signing configuration in `android/app/build.gradle`.
3. **iOS Certificates**:
   - Use valid Distribution Certificates and Provisioning Profiles from your Apple Developer account.

---

Feel free to reach out to the development team for any assistance! 🚀
