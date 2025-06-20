import React from 'react';
import { View, StyleSheet } from 'react-native';
import TextComponent from '../components/Text';
import { colors } from '../config/colors';

const ProfileScreen = () => (
  <View style={styles.container}>
    <TextComponent text="Profile Screen" color={colors.white} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkMode,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
