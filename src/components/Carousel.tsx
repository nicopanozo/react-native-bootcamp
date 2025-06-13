import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';
import { fetchPopularMovies } from '../api/tmdb';
import Button from './Button'; // Importar el nuevo componente
import TextComponent from './Text'; // Importar el componente Text

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w780'; // Use higher resolution images
const width = Dimensions.get('window').width;

interface Movie {
  id: number;
  title: string;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average: number; // Rating of the movie
}

const CarouselComponent = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchPopularMovies();
        // Filter top 5 movies by rating
        const topRatedMovies = data
          .sort((a: Movie, b: Movie) => b.vote_average - a.vote_average)
          .slice(0, 5);
        setMovies(topRatedMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Carousel
        width={width * 0.9}
        height={width * 1.2}
        data={movies}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{
                uri: `${IMAGE_BASE_URL}${item.backdrop_path || item.poster_path}`,
              }}
              style={styles.image}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.gradient}
            />
            <View style={styles.overlay}>
              <View style={styles.textRow}>
                <TextComponent
                  text="My list"
                  color="#fff"
                  fontSize={16}
                  fontWeight="bold"
                />
                <TextComponent
                  text="Discover"
                  color="#fff"
                  fontSize={16}
                  fontWeight="bold"
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  color="#333"
                  textColor="#fff"
                  text="+ Wishlist"
                  onPress={() => console.log('Wishlist pressed')}
                />
                <Button
                  color="#FFD700"
                  textColor="#000"
                  text="Details"
                  onPress={() => console.log('Details pressed')}
                />
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000',
    paddingTop: 20, // Add margin at the top
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '40%',
  },
  overlay: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the texts horizontally
    alignItems: 'center',
    gap: 10, // Add minimal spacing between "My list" and "Discover"
    marginBottom: 5, // Reduced spacing
  },
  listText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  discoverText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // Reduce spacing between buttons
    width: '100%',
    marginTop: 5, // Reduced spacing
  },
  buttonWishlist: {
    backgroundColor: '#333',
    paddingVertical: 15, // Increase button size
    paddingHorizontal: 30, // Increase button size
    borderRadius: 8, // Slightly larger border radius
  },
  buttonTextWishlist: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16, // Larger text
  },
  buttonDetails: {
    backgroundColor: '#FFD700',
    paddingVertical: 15, // Increase button size
    paddingHorizontal: 30, // Increase button size
    borderRadius: 8, // Slightly larger border radius
  },
  buttonTextDetails: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16, // Larger text
  },
});

export default CarouselComponent;
