import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Slider = () => {
  const [count] = useState(1);

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>{count}</Text>
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  counter: {
    fontSize: 40,
  },
});
