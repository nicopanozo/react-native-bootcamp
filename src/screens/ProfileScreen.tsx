import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import TextComponent from '../components/Text';
import { colors } from '../config/colors';
import { useWishlist } from '../context/WishlistContext';
import Button from '../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../navigation/types';

const ProfileScreen = () => {
  const { wishlist } = useWishlist();
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();

  return (
    <SafeAreaView style={styles.safeContainer}>
      <TextComponent
        text="Profile"
        color={colors.primary}
        variant="h1"
        style={styles.title}
      />

      <View style={styles.content}>
        <View style={styles.profileSection}>
          <Image
            source={require('../../assets/tyrion-lannister.jpg')}
            style={styles.avatar}
          />
          <TextComponent
            text="Tyrion Lannister"
            variant="h2"
            color={colors.white}
            style={styles.name}
          />
          <TextComponent
            text="tyrionlannister@example.com"
            variant="body"
            color={colors.white}
          />
        </View>

        <View style={styles.statsBox}>
          <TextComponent
            text={`You have ${wishlist.length} ${
              wishlist.length === 1 ? 'movie' : 'movies'
            } in your wishlist`}
            variant="body"
            color={colors.white}
          />
        </View>

        <View style={styles.buttons}>
          <Button
            text="View Wishlist"
            onPress={() => navigation.navigate('Wishlist')}
            style={styles.button}
          />
          <Button
            text="Settings"
            onPress={() => console.log('Settings')}
            style={styles.button}
          />
          <Button
            text="Logout"
            onPress={() => console.log('Logout')}
            color={colors.darkMode}
            textColor={colors.primary}
            style={[styles.button, styles.logoutButton]}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <TextComponent
          text="Built with React Native & TMDB API"
          variant="body"
          color={colors.white}
        />
        <TextComponent
          text="Version 1.0.0"
          variant="body"
          color={colors.white}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colors.darkMode,
    paddingHorizontal: 16,
  },
  title: {
    marginTop: 10,
    marginBottom: 16,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.primary,
    marginBottom: 12,
  },
  name: {
    marginBottom: 4,
  },
  statsBox: {
    backgroundColor: colors.darkLight,
    padding: 12,
    borderRadius: 10,
    marginBottom: 32,
    width: '100%',
    alignItems: 'center',
  },
  buttons: {
    width: '100%',
    gap: 16,
    alignItems: 'center',
  },
  button: {
    width: '100%',
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.darkMode,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 10,
  },
});

export default ProfileScreen;
