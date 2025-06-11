import { View, Text, StyleSheet } from "react-native";
import React from "react";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1d49e8",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});

const Home = (): React.ReactElement => {
  return (
    <View style={styles.container}>
      <Text>Home Component</Text>
    </View>
  );
};

export default Home;
