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
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { fetchPopularMovies } from '../api/tmdb';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w780';
const width = Dimensions.get('window').width;
const MAX_DOTS = 5;

interface Movie {
  id: number;
  title: string;
  backdrop_path: string | null;
  poster_path: string | null;
}

const CarouselComponent = () => {
  const ref = React.useRef<ICarouselInstance>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchPopularMovies();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  useEffect(() => {
    if (movies.length > 0 && !initialized) {
      const centerIndex = Math.floor(movies.length / 2);
      setCurrentIndex(centerIndex);
      ref.current?.scrollTo({ index: centerIndex, animated: false });
      setInitialized(true);
    }
  }, [movies, initialized]);

  const renderPagination = () => {
    if (movies.length === 0) return null;

    const totalDots = movies.length;
    const halfDots = Math.floor(MAX_DOTS / 2);

    // Calcular rango dinámico de puntos visibles
    let start = Math.max(0, currentIndex - halfDots);
    let end = Math.min(totalDots, start + MAX_DOTS);

    // Ajustar si estamos cerca del final
    if (end - start < MAX_DOTS) {
      start = Math.max(0, end - MAX_DOTS);
    }

    return (
      <View style={styles.paginationContainer}>
        {Array.from({ length: end - start }).map((_, index) => {
          const dotIndex = start + index;
          return (
            <TouchableOpacity
              key={dotIndex}
              onPress={() => {
                ref.current?.scrollTo({ index: dotIndex, animated: true });
              }}
            >
              <View
                style={
                  dotIndex === currentIndex ? styles.activeDot : styles.dot
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

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
        ref={ref}
        width={width * 0.9}
        height={width * 1.2}
        data={movies}
        onSnapToItem={index => setCurrentIndex(index)}
        defaultIndex={Math.floor(movies.length / 2)}
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
                <Text style={styles.listText}>My list</Text>
                <Text style={styles.discoverText}>Discover</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonWishlist}>
                  <Text style={styles.buttonTextWishlist}>+ Wishlist</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonDetails}>
                  <Text style={styles.buttonTextDetails}>Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
      {renderPagination()}
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
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 5,
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
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 5,
  },
  buttonWishlist: {
    backgroundColor: '#333',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonTextWishlist: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  buttonDetails: {
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonTextDetails: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  dot: {
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 10,
    height: 10,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#FFD700',
    borderRadius: 50,
    width: 12,
    height: 12,
    marginHorizontal: 5,
  },
});

export default CarouselComponent;
