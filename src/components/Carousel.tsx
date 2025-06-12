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
import { useSharedValue } from 'react-native-reanimated';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import { fetchPopularMovies } from '../api/tmdb';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const width = Dimensions.get('window').width;

interface Movie {
  id: number;
  title: string;
  backdrop_path: string | null;
  poster_path: string | null;
}

const CarouselComponent = () => {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

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

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
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
        width={width * 0.9} // Adjust width to fit within the screen
        height={width / 2}
        data={movies}
        onProgressChange={progress}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{
                uri: `${IMAGE_BASE_URL}${item.backdrop_path || item.poster_path}`,
              }}
              style={styles.image}
            />
            <Text style={styles.title}>{item.title}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Learn More</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Pagination.Basic
        progress={progress}
        data={movies}
        dotStyle={styles.dot}
        containerStyle={styles.paginationContainer}
        onPress={onPressPagination}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center the carousel vertically
    alignItems: 'center',
    paddingTop: 50, // Add padding to avoid sticking to the top
    paddingBottom: 50, // Add padding to avoid cutting off at the bottom
    backgroundColor: '#f8f9fa', // Optional: Add a background color for better visibility
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '80%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  paginationContainer: {
    gap: 5,
    marginTop: 10,
  },
  dot: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 50,
    width: 10,
    height: 10,
  },
});

export default CarouselComponent;
