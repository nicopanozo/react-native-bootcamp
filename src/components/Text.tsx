import React, { FC } from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

interface TextProps {
  text: string;
  color: string;
  fontSize: number;
  fontWeight: TextStyle['fontWeight'];
  style?: object;
}

const TextComponent: FC<TextProps> = ({
  text,
  color,
  fontSize,
  fontWeight,
  style,
}) => {
  return (
    <Text style={[styles.text, { color, fontSize, fontWeight }, style]}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    paddingVertical: 8,
  },
});

export default TextComponent;
