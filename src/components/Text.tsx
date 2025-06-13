import React from 'react';
import { Text, StyleSheet, TextStyle, TextProps } from 'react-native';
import { theme } from '../config/theme';

type Variant = keyof typeof theme.textVariants;

interface Props extends TextProps {
  text: string;
  variant?: Variant;
  color?: string;
  style?: TextStyle;
}

const TextComponent = ({
  text,
  variant = 'body',
  color,
  style,
  ...rest
}: Props) => {
  const textStyle = {
    ...theme.textVariants[variant],
    color: color || theme.colors.white,
    ...style,
  } as TextStyle;

  return (
    <Text style={textStyle} {...rest}>
      {text}
    </Text>
  );
};

export default TextComponent;
