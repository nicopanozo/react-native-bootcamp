import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../config/colors';
import { theme } from '../config/theme';

interface AdProps {
  imageSource?: any;
  title?: string;
  description?: string;
}

const Ad: React.FC<AdProps> = ({
  imageSource = require('../../assets/black-friday.png'),
  title = 'Black friday is here!',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra sociis pulvinar auctor nibh nibh iaculis id.',
}) => {
  return (
    <View style={styles.adContainer}>
      <Image source={imageSource} style={styles.adImage} resizeMode="cover" />
      <View style={styles.textContainer}>
        <Text style={styles.adTitle}>{title}</Text>
        <Text style={styles.adDescription}>{description}</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Check details</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  adContainer: {
    backgroundColor: colors.darkMode,
    margin: 18,
    paddingBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  adImage: {
    width: '100%',
    height: 200,
    marginBottom: 18,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 18,
  },
  adTitle: {
    color: colors.white,
    fontFamily: theme.fonts.bold,
    fontSize: 24,
    marginBottom: 10,
  },
  adDescription: {
    color: colors.white,
    fontFamily: theme.fonts.regular,
    fontSize: 16,
    opacity: 0.85,
  },
  button: {
    backgroundColor: '#EAC24A',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: '90%',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#222',
    fontFamily: theme.fonts.medium,
    fontSize: 22,
    textAlign: 'center',
  },
});

export default Ad;
