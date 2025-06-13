// App.tsx

import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import Home from './src/screens/Home';
import { theme } from './src/config/theme';

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          'Gilroy-Bold': require('./assets/fonts/gilroy-bold.ttf'),
          'Gilroy-Medium': require('./assets/fonts/gilroy-medium.ttf'),
          'Gilroy-Regular': require('./assets/fonts/gilroy-regular.ttf'),
          'Gilroy-SemiBold': require('./assets/fonts/gilroy-semibold.ttf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
        // Even if fonts fail to load, show the app
        setFontsLoaded(true);
      }
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // You could show a loading screen here
  }

  return (
    <SafeAreaView style={styles.container}>
      <Home />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.darkMode,
  },
});

export default App;
