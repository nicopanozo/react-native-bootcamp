import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Slider from "./Slider";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40
  },
  tab: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10
  }
});

const Home = (): React.ReactElement => {
  return (
    <View style={styles.container}>
      <Text style={styles.tab}>My List     Discover</Text>
      <Slider />
    </View>
  );
};

export default Home;
