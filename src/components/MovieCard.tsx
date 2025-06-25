import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TextComponent from './Text';
import { getImageUrl } from '../utils/getImageUrl';
import { theme } from '../config/theme';
import { Movie } from '../types';
import { useWishlist } from '../context/WishlistContext';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface MovieCardProps {
  movie: Movie;
  isFirst: boolean;
  isLast: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isFirst, isLast }) => {
  const imageUrl = getImageUrl(movie.poster_path || movie.backdrop_path || '');
  const rating = movie.vote_average.toFixed(1);
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const isInWishlist = wishlist.some(item => item.id === movie.id);

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(movie.id);
      console.log(`"${movie.title}" removed from Wishlist`);
    } else {
      addToWishlist(movie);
      console.log(`"${movie.title}" added to Wishlist`);
    }
  };

  return (
    <Pressable
      style={[
        styles.movieCard,
        isFirst && styles.firstCard,
        isLast && styles.lastCard,
      ]}
      onPress={() => console.log('Movie pressed:', movie.title)}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.movieImage}
          resizeMode="cover"
        />

        {/* Wishlist Toggle Button */}
        <TouchableOpacity
          style={styles.wishlistButton}
          onPress={handleWishlistToggle}
          accessibilityRole="button"
        >
          <FontAwesome
            name={isInWishlist ? 'check' : 'plus'}
            size={16}
            color={isInWishlist ? theme.colors.primary : theme.colors.white}
          />
        </TouchableOpacity>

        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
          start={{ x: 0, y: 0.6 }}
          end={{ x: 0, y: 1 }}
          style={styles.imageOverlay}
        >
          <View style={styles.ratingContainer}>
            <TextComponent
              text="★"
              variant="body"
              color={theme.colors.primary}
            />
            <TextComponent
              text={rating}
              variant="body"
              color={theme.colors.white}
            />
          </View>
        </LinearGradient>
      </View>

      <View style={styles.movieInfo}>
        <TextComponent
          text={movie.title}
          variant="body"
          color={theme.colors.white}
          numberOfLines={2}
          style={styles.movieTitle}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  movieCard: {
    width: width * 0.28,
    marginRight: 12,
  },
  firstCard: {
    marginLeft: 0,
  },
  lastCard: {
    marginRight: 0,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: theme.colors.darkLight,
  },
  movieImage: {
    width: '100%',
    height: width * 0.42,
  },
  wishlistButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    padding: 6,
    zIndex: 10,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    justifyContent: 'flex-end',
    paddingHorizontal: 8,
    paddingBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  movieInfo: {
    marginTop: 8,
    paddingHorizontal: 4,
  },
  movieTitle: {
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
  },
});

export default MovieCard;
