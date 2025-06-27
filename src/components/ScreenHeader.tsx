import React from 'react';
import { StyleSheet } from 'react-native';
import TextComponent from './Text';
import { colors } from '../config/colors';

interface ScreenHeaderProps {
  title: string;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title }) => (
  <TextComponent
    text={title}
    color={colors.primary}
    variant="h1"
    style={styles.title}
  />
);

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginBottom: 16,
    marginTop: 10,
  },
});

export default ScreenHeader;
