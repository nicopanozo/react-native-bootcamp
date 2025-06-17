import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
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
          borderTopWidth: 0,
          paddingTop: 10,
          paddingBottom: 10,
          height: 88,
        },
        tabBarItemStyle: {
          marginHorizontal: 30,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.white,
        tabBarLabelStyle: {
          fontFamily: theme.fonts.semiBold,
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
            <FontAwesome6
              name="house"
              size={28}
              color={focused ? colors.primary : colors.white}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome6
              name="magnifying-glass"
              size={28}
              color={focused ? colors.primary : colors.white}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome6
              name="bookmark"
              size={28}
              color={focused ? colors.primary : colors.white}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome6
              name="user"
              size={28}
              color={focused ? colors.primary : colors.white}
            />
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
});

export default TabNavigator;
