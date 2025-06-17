import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import TextComponent from './Text';
import { colors } from '../config/colors';
import { theme } from '../config/theme';

interface TopNavigationProps {
  onCategoryChange?: (category: string) => void;
}

const categories = ['All', 'Romance', 'Sport', 'Kids', 'Horror'];

const TopNavigation: React.FC<TopNavigationProps> = ({ onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
    onCategoryChange?.(category);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        bounces={false}
      >
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton,
            ]}
            onPress={() => handleCategoryPress(category)}
            activeOpacity={0.7}
          >
            <TextComponent
              text={category}
              color={
                selectedCategory === category ? colors.darkMode : colors.white
              }
              style={styles.categoryText}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    zIndex: 10,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  categoryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  selectedCategoryButton: {
    backgroundColor: colors.white,
    borderColor: colors.white,
  },
  categoryText: {
    fontFamily: theme.fonts.semiBold,
    fontSize: theme.fontSizes.md,
    textAlign: 'center',
  },
  selectedCategoryText: {
    fontFamily: theme.fonts.semiBold,
  },
});

export default TopNavigation;
