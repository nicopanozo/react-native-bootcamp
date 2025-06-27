import React from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import TextComponent from '../components/Text';
import { colors } from '../config/colors';
import { useWishlist } from '../context/WishlistContext';
import { getImageUrl } from '../utils/getImageUrl';
import Button from '../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';

const WishlistScreen = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Wishlist" />
      {wishlist.length === 0 ? (
        <TextComponent
          text="No movies in your wishlist."
          color={colors.white}
          style={styles.noResults}
        />
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image
                source={{
                  uri: getImageUrl(
                    item.poster_path ?? item.backdrop_path ?? '',
                    'w185',
                  ),
                }}
                style={styles.image}
              />
              <View style={styles.info}>
                <TextComponent
                  text={item.title}
                  color={colors.white}
                  style={styles.movieTitle}
                />
                <TextComponent
                  text={`Rating: ${item.vote_average.toFixed(1)}`}
                  color={colors.primary}
                />
                <Button
                  text="Remove"
                  onPress={() => removeFromWishlist(item.id)}
                  color={colors.primary}
                  textColor="#000"
                  style={styles.removeButton}
                />
              </View>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkMode,
    paddingHorizontal: 16,
  },
  noResults: {
    marginTop: 20,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: colors.darkLight,
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
  },
  image: {
    width: 90,
    height: 130,
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  movieTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 6,
  },
  removeButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
});

export default WishlistScreen;
