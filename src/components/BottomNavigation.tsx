import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import TextComponent from './Text';
import { colors } from '../config/colors';
import { theme } from '../config/theme';

interface BottomNavigationProps {
  onTabChange?: (tab: string) => void;
}

interface TabItem {
  id: string;
  title: string;
  iconName: string;
}

const tabs: TabItem[] = [
  { id: 'home', title: 'Home', iconName: 'house' },
  { id: 'search', title: 'Search', iconName: 'search' },
  { id: 'wishlist', title: 'Wishlist', iconName: 'bookmark' },
  { id: 'profile', title: 'Profile', iconName: 'user' },
];

const BottomNavigation: React.FC<BottomNavigationProps> = ({ onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState('home');

  const handleTabPress = (tabId: string) => {
    setSelectedTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabButton}
            onPress={() => handleTabPress(tab.id)}
            activeOpacity={0.7}
          >
            <View style={styles.tabContent}>
              <View
                style={[
                  styles.iconContainer,
                  selectedTab === tab.id && styles.selectedIconContainer,
                ]}
              >
                <FontAwesome6
                  name={tab.iconName as any}
                  size={18}
                  color={
                    selectedTab === tab.id ? colors.darkMode : colors.white
                  }
                />
              </View>
              <TextComponent
                text={tab.title}
                color={
                  selectedTab === tab.id ? colors.primary : colors.darkLight
                }
                style={styles.tabText}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.darkMode,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: colors.darkMode,
    paddingTop: 10,
    paddingBottom: 5,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: colors.darkLight,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  selectedIconContainer: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.sm,
    textAlign: 'center',
  },
});

export default BottomNavigation;
