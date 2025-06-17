// src/navigation/TabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Home from '../screens/Home';
import TextComponent from '../components/Text';
import { colors } from '../config/colors';
import { theme } from '../config/theme';
import { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const SearchScreen = () => (
  <View style={styles.screenContainer}>
    <TextComponent text="Search Screen" color={colors.white} />
  </View>
);

const WishlistScreen = () => (
  <View style={styles.screenContainer}>
    <TextComponent text="Wishlist Screen" color={colors.white} />
  </View>
);

const ProfileScreen = () => (
  <View style={styles.screenContainer}>
    <TextComponent text="Profile Screen" color={colors.white} />
  </View>
);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.darkMode,
          borderTopWidth: 1,
          borderTopColor: colors.darkLight,
          paddingTop: 10,
          paddingBottom: 5,
          height: 80,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.darkLight,
        tabBarLabelStyle: {
          fontFamily: theme.fonts.regular,
          fontSize: theme.fontSizes.sm,
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.selectedIconContainer,
              ]}
            >
              <Ionicons
                name="home"
                size={20}
                color={focused ? colors.darkMode : colors.white}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.selectedIconContainer,
              ]}
            >
              <Ionicons
                name="search"
                size={20}
                color={focused ? colors.darkMode : colors.white}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.selectedIconContainer,
              ]}
            >
              <Ionicons
                name="bookmark"
                size={20}
                color={focused ? colors.darkMode : colors.white}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.selectedIconContainer,
              ]}
            >
              <Ionicons
                name="person"
                size={20}
                color={focused ? colors.darkMode : colors.white}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.darkMode,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedIconContainer: {
    backgroundColor: colors.primary,
  },
});

export default TabNavigator;
