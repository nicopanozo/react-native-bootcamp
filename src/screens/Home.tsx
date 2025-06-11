// src/screens/Home.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Slider from './Slider';

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.tabs}>My List     Discover</Text>
      </View>

      <View style={styles.middleSection}>
        <Slider />
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.buttons}>
          <View style={styles.button}>
            <Button title="WishList" color="green" onPress={() => alert('Go to WishList')} />
          </View>
          <View style={styles.button}>
            <Button title="Details" color="green" onPress={() => alert('Go to Details')} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    flex: 0.5,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
  },
  middleSection: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSection: {
    flex: 0.7,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
  },
  tabs: {
    fontSize: 16,
    fontWeight: '500',
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: 10,
  },
});
