import React, { FC } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import { theme } from '../config/theme';

interface ButtonProps {
  color?: string;
  text: string;
  textColor?: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: object;
}

const Button: FC<ButtonProps> = ({
  color = theme.colors.primary,
  text,
  textColor = theme.colors.white,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: 170,
    height: 55,
  },
  text: {
    fontFamily: theme.fonts.semiBold,
    fontSize: theme.fontSizes.lg,
  },
});

export default Button;
