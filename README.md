# React Native Bootcamp (TypeScript)

This is a modern React Native Movies App built using [Expo](https://expo.dev/) and TypeScript.
Powered by the TMDb API, it delivers up-to-date movie content, including trending, top-rated, upcoming, and now playing films.
Explore movies by genre, discover Marvel and action hits, and enjoy rich details like ratings, descriptions, and categories—all in a beautifully designed interface inspired by [Figma design](https://www.figma.com/community/file/1126286295256197533/movies-mobile-app-home-light-dark).

It is an open source mobile app, focused on learning and applying modern React Native concepts and best practices.

---

## 🏆 Key Concepts & Features

- **Custom Hooks** for reusable logic and cleaner components
- **API Consumption** using [The Movie Database (TMDb) API](https://developer.themoviedb.org/reference/intro/getting-started)
- **Navigation** with React Navigation (stack, bottom tabs)
- **Carousel & Animations** with react-native-reanimated and react-native-reanimated-carousel
- **Theming & UI** using react-native-paper and react-native-linear-gradient
- **Safe Area Handling** with react-native-safe-area-context
- **Custom Fonts** and splash screens
- **Vector Icons** with @react-native-vector-icons/fontawesome6
- **Environment Variables** with dotenv
- **Prettier** and **ESLint** for code formatting and linting
- **TypeScript** for type safety and better developer experience
- **Metro Config** customization for advanced bundling

---

## 🎨 Design

- Based on this [Figma community design](https://www.figma.com/community/file/1126286295256197533/movies-mobile-app-home-light-dark) for a modern movies mobile app (light & dark mode).

---

## 🚀 Getting Started

### 📱 Requirements

- Node.js (v18 or higher recommended)
- Expo CLI
- Android Studio (optional, for emulator)

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd react-native-bootcamp
```

### 2. Install dependencies

```bash
npm install axios
npm install dotenv
npx expo install expo-constants
npx expo install react-native-safe-area-context
npm install --save-dev prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser
npx expo install react-native-reanimated react-native-gesture-handler
npm install react-native-reanimated-carousel
npm install @react-native/metro-config
npx expo install react-native-linear-gradient
npx expo install expo-font expo-app-loading
npx expo install react-native-paper
npm install @react-navigation/native
npx expo install react-native-screens
npm install @react-navigation/bottom-tabs
npm install @react-navigation/native-stack
npm install @react-navigation/stack
npm install --save @react-native-vector-icons/fontawesome6
```

> **Tip:** To install additional packages, use:
> ```bash
> npm install <package-name>
> ```

### 3. Create the project (if starting from scratch)

```bash
npx create-expo-app my-app --template
# Choose: blank (TypeScript)
cd my-app
```

### 4. Start the development server

```bash
npx expo start
```
Scan the QR code with the Expo Go app on your mobile device, or open it on an emulator.

### 5. Testing on Android Emulator

- Install Android Studio
- Create a virtual device (AVD)
- Run the emulator
- Start the app on the emulator:

```bash
npx expo start --android
```

---

## 📚 Credits & Acknowledgements

- Built with [React Native](https://reactnative.dev/) and [Expo](https://expo.dev/)
- Movie data powered by [The Movie Database (TMDb) API](https://developer.themoviedb.org/reference/intro/getting-started)
- UI inspired by [Figma Movies Mobile App Design](https://www.figma.com/community/file/1126286295256197533/movies-mobile-app-home-light-dark)

---

## 📖 License

This project is open source and available under the [MIT License](LICENSE).

```
MIT License

Copyright (c) 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```