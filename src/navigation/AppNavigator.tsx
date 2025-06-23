import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import { RootStackParamList } from './types';
import SeeMoreScreen from '../screens/SeeMoreScreen';
import { theme } from '../config/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen
          name="SeeMore"
          component={SeeMoreScreen}
          options={({ route }) => ({
            headerShown: true,
            title: route.params?.category ?? 'See More',
            headerStyle: { backgroundColor: theme.colors.darkLight },
            headerTintColor: theme.colors.white,
            headerBackTitleVisible: false,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
