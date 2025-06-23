import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { useFonts } from 'expo-font';
import { ActivityIndicator, View } from 'react-native';
import { WishlistProvider } from './src/context/WishlistContext';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Gilroy-Bold': require('./assets/fonts/gilroy-bold.ttf'),
    'Gilroy-SemiBold': require('./assets/fonts/gilroy-semibold.ttf'),
    'Gilroy-Medium': require('./assets/fonts/gilroy-medium.ttf'),
    'Gilroy-Regular': require('./assets/fonts/gilroy-regular.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000',
        }}
      >
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <WishlistProvider>
      <>
        <StatusBar style="light" backgroundColor="transparent" translucent />
        <AppNavigator />
      </>
    </WishlistProvider>
  );
}
