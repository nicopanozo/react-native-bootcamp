import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  LayoutChangeEvent,
} from 'react-native';
import TextComponent from './Text';
import { colors } from '../config/colors';
import { theme } from '../config/theme';
import { CATEGORIES, Category } from '../constants/categories';

interface TopNavigationProps {
  onCategoryChange?: (category: Category) => void;
}

const TopNavigation: React.FC<TopNavigationProps> = ({ onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [itemLayouts, setItemLayouts] = useState<{
    [key in Category]?: { x: number; width: number };
  }>({});

  const indicatorX = useRef(new Animated.Value(0)).current;
  const indicatorWidth = useRef(new Animated.Value(0)).current;

  const handleCategoryPress = (category: Category) => {
    setSelectedCategory(category);
    onCategoryChange?.(category);
  };

  useEffect(() => {
    const layout = itemLayouts[selectedCategory];
    if (layout) {
      Animated.parallel([
        Animated.spring(indicatorX, {
          toValue: layout.x,
          useNativeDriver: false,
        }),
        Animated.spring(indicatorWidth, {
          toValue: layout.width,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [selectedCategory, itemLayouts]);

  const handleItemLayout =
    (category: Category) => (event: LayoutChangeEvent) => {
      const { x, width } = event.nativeEvent.layout;
      setItemLayouts(prev => ({ ...prev, [category]: { x, width } }));
    };

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Animated.View
          style={[
            styles.animatedIndicator,
            {
              transform: [{ translateX: indicatorX }],
              width: indicatorWidth,
            },
          ]}
        />
        {CATEGORIES.map(category => {
          const isSelected = selectedCategory === category;
          return (
            <TouchableOpacity
              key={category}
              style={styles.sliderItem}
              onPress={() => handleCategoryPress(category)}
              onLayout={handleItemLayout(category)}
              activeOpacity={0.7}
            >
              <TextComponent
                text={category}
                color={isSelected ? colors.darkMode : colors.white}
                style={styles.sliderText}
                numberOfLines={1}
                adjustsFontSizeToFit
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    paddingTop: 50,
    paddingBottom: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  sliderContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.darkLight + 'CC',
    borderRadius: 35,
    paddingVertical: 8,
    paddingHorizontal: 2,
    width: '90%',
    position: 'relative',
  },
  sliderItem: {
    flex: 1,
    flexBasis: 0,
    paddingVertical: 16,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedIndicator: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    left: 0,
    backgroundColor: colors.white,
    borderRadius: 50,
  },
  sliderText: {
    fontFamily: theme.fonts.semiBold,
    fontSize: theme.fontSizes.md,
    flexShrink: 1,
    minWidth: 0,
    textAlign: 'center',
  },
});

export default TopNavigation;
