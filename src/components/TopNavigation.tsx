import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import TextComponent from './Text';
import { colors } from '../config/colors';
import { theme } from '../config/theme';
import { CATEGORIES, Category } from '../constants/categories';

interface TopNavigationProps {
  onCategoryChange?: (category: Category) => void;
}

const TopNavigation: React.FC<TopNavigationProps> = ({ onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');

  const handleCategoryPress = (category: Category) => {
    setSelectedCategory(category);
    onCategoryChange?.(category);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        {CATEGORIES.map(category => {
          const isSelected = selectedCategory === category;
          return (
            <TouchableOpacity
              key={category}
              style={[
                styles.sliderItem,
                isSelected && styles.selectedSliderItem,
              ]}
              onPress={() => handleCategoryPress(category)}
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
  },
  sliderItem: {
    flex: 1,
    flexBasis: 0,
    flexShrink: 1,
    paddingVertical: 16,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    minWidth: 0,
  },
  selectedSliderItem: {
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
