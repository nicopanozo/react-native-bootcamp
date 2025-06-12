import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import CarouselComponent from './src/components/Carousel';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CarouselComponent />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
