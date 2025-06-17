import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import TextComponent from './Text';
import { colors } from '../config/colors';
import { theme } from '../config/theme';

interface BottomNavigationProps {
  onTabChange?: (tab: string) => void;
}

interface TabItem {
  id: string;
  title: string;
  icon: string;
}

const tabs: TabItem[] = [
  { id: 'home', title: 'Home', icon: '🏠' },
  { id: 'search', title: 'Search', icon: '🔍' },
  { id: 'wishlist', title: 'Wishlist', icon: '📋' },
  { id: 'profile', title: 'Profile', icon: '👤' },
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
                <TextComponent text={tab.icon} style={styles.icon} />
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
  icon: {
    fontSize: 18,
  },
  tabText: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.sm,
    textAlign: 'center',
  },
});

export default BottomNavigation;
