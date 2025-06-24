import React, { useEffect } from 'react';
import { Dimensions, View} from 'react-native';
import { Snackbar } from 'react-native-paper';
import { FontAwesome6 } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import TextComponent from './Text';
import { colors } from '../config/colors';

const { width } = Dimensions.get('window');

interface CustomSnackbarProps {
  visible: boolean;
  onDismiss: () => void;
  message: string;
  iconName?: string;
  iconColor?: string;
  duration?: number;
  bottomOffset?: number;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  visible,
  onDismiss,
  message,
  iconName,
  iconColor = colors.primary,
  duration = 2000,
  bottomOffset = 110,
}) => {
  const translateY = useSharedValue(40);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = 40;
      opacity.value = 0;
      translateY.value = withTiming(0, { duration: 350 });
      opacity.value = withTiming(1, { duration: 350 });
    } else {
      translateY.value = withTiming(40, { duration: 350 });
      opacity.value = withTiming(0, { duration: 350 });
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left: width * 0.15,
          right: width * 0.15,
          bottom: bottomOffset,
          zIndex: 100,
        },
        animatedStyle,
      ]}
      pointerEvents="box-none"
    >
      <Snackbar
        visible={visible}
        onDismiss={onDismiss}
        duration={duration}
        style={{
          backgroundColor: colors.darkLight,
          borderRadius: 12,
          paddingVertical: 8,
          paddingHorizontal: 10,
          elevation: 6,
          opacity: 0.85,
          minHeight: 20,
          maxWidth: width * 5,
          alignSelf: 'center',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
    {iconName && (
      <FontAwesome6
        name={iconName}
        size={18}
        color={iconColor}
        style={{ marginRight: 8 }}
      />
    )}
    <TextComponent
      text={message}
      color={colors.white}
      style={{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 18,
      }}
    />
  </View>
      </Snackbar>
    </Animated.View>
  );
};

export default CustomSnackbar;