import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList, MainTabParamList } from '../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';

type SeeMoreScreenRouteProp = RouteProp<RootStackParamList, 'SeeMore'>;
type StackNavProp = StackNavigationProp<RootStackParamList, 'SeeMore'>;

const validTabs = ['Home', 'Search', 'Wishlist', 'Profile'] as const;

const SeeMoreScreen = () => {
  const route = useRoute<SeeMoreScreenRouteProp>();
  const navigation = useNavigation<StackNavProp>();
  const { category, redirectTo } = route.params;

  const handleRedirect = () => {
    if (redirectTo && validTabs.includes(redirectTo)) {
      navigation.navigate('Main', { screen: redirectTo });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>See More Screen</Text>
      <Text style={styles.categoryText}>Category: {category}</Text>
      {redirectTo && validTabs.includes(redirectTo) && (
        <TouchableOpacity
          style={styles.button}
          onPress={handleRedirect}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>{`Go to ${redirectTo}`}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  categoryText: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: 170,
    height: 55,
    backgroundColor: '#007AFF',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default SeeMoreScreen;
