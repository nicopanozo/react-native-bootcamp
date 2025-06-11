# React Native Bootcamp (TypeScript)

This is a React Native project built using [Expo](https://expo.dev/) with TypeScript.

## 🚀 Getting Started

### Create the project

```bash
npx create-expo-app my-app --template
# Choose: blank (TypeScript)
cd my-app
```

### Start the development server
npx expo start
You can scan the QR code with the Expo Go app on your mobile device, or open it on an emulator.

### 📱 Requirements

- Node.js (v18 or higher recommended)
- Expo CLI
- Android Studio (optional, for emulator)

### Install Expo CLI globally (optional)
```bash
npm install -g expo-cli
```

### 📦 Install dependencies
If you need to install extra packages, use:

```bash
npm install <package-name>
```

### 🧪 Testing on Android Emulator
- Install Android Studio
- Create a virtual device (AVD)
- Run the emulator
- Start the app on the emulator:
```bash
npx expo start --android
```

### 🛠 Project Structure
```
react-native-bootcamp
├──assets
│   ├──adaptive-icon.png
│   ├──favicon.png
│   ├──icon.png
│   └──splash-icon.png
├──app.json
├──App.tsx
├──index.ts
├──package-lock.json
├──package.json
├──README.md
├──tsconfig.json
└──.gitignore
```