// screens/Slider.tsx
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Slider = () => {
  const [count, setCount] = useState(1);

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>{count}</Text>

      <View style={styles.buttons}>
        <Button title="WishList" color="green" onPress={() => alert('Go to WishList')} />
        <Button title="Details" color="green" onPress={() => alert('Go to Details')} />
      </View>
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  counter: {
    fontSize: 40,
    marginBottom: 20
  },
  buttons: {
    flexDirection: 'row',
    gap: 10, // solo funciona en expo SDK 49+ o RN 0.73+, si no, usa marginRight en los botones
    marginTop: 20
  }
});
