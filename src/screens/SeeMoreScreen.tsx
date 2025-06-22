import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  ActivityIndicator,
  StatusBar,
  Pressable,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../config/theme';
import TextComponent from '../components/Text';
import { getImageUrl } from '../utils/getImageUrl';
import {
  fetchTopRatedMovies,
  fetchMarvelMovies,
  fetchActionMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
  fetchPopularMovies,
} from '../api/tmdb';

type SeeMoreScreenRouteProp = RouteProp<RootStackParamList, 'SeeMore'>;
type StackNavProp = StackNavigationProp<RootStackParamList, 'SeeMore'>;

const validTabs = ['Home', 'Search', 'Wishlist', 'Profile'] as const;

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
}

const { width } = Dimensions.get('window');
const numColumns = 3;
const movieWidth = (width - 48) / numColumns;

const SeeMoreScreen = () => {
  const route = useRoute<SeeMoreScreenRouteProp>();
  const navigation = useNavigation<StackNavProp>();
  const { category } = route.params;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        let fetchedMovies: Movie[] = [];

        switch (category) {
          case 'Marvel studios':
            fetchedMovies = await fetchMarvelMovies();
            break;
          case 'Best movies':
            fetchedMovies = await fetchTopRatedMovies();
            break;
          case 'Action movies':
            fetchedMovies = await fetchActionMovies();
            break;
          case 'Trending now':
            fetchedMovies = await fetchTrendingMovies();
            break;
          case 'Coming soon':
            fetchedMovies = await fetchUpcomingMovies();
            break;
          default:
            fetchedMovies = await fetchPopularMovies();
        }

        setMovies(fetchedMovies);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Failed to load movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category]);

  const renderMovieItem = ({ item, index }: { item: Movie; index: number }) => {
    const imageUrl = getImageUrl(item.poster_path || item.backdrop_path || '');
    const rating = item.vote_average.toFixed(1);

    return (
      <Pressable
        style={styles.movieCard}
        onPress={() => console.log('Movie pressed:', item.title)}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.movieImage}
            resizeMode="cover"
          />
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
            text={item.title}
            variant="body"
            color={theme.colors.white}
            numberOfLines={2}
            style={styles.movieTitle}
          />
        </View>
      </Pressable>
    );
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <TextComponent text="←" variant="h1" color={theme.colors.white} />
      </Pressable>
      <TextComponent text={category} variant="h1" color={theme.colors.white} />
      <View style={styles.placeholder} />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.secondary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <TextComponent text={error} variant="body" color={theme.colors.white} />
        <Pressable
          style={styles.retryButton}
          onPress={() => navigation.goBack()}
        >
          <TextComponent
            text="Go Back"
            variant="body"
            color={theme.colors.white}
          />
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.dark} />

      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={item => item.id.toString()}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderHeader}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.dark,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.dark,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.dark,
    padding: 20,
  },
  retryButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: theme.colors.dark,
  },
  backButton: {
    padding: 8,
  },
  placeholder: {
    width: 40,
  },
  listContent: {
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  movieCard: {
    width: movieWidth,
    marginBottom: 8,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: theme.colors.darkLight,
  },
  movieImage: {
    width: '100%',
    height: movieWidth * 1.5,
    borderRadius: 8,
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
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
  },
});

export default SeeMoreScreen;
