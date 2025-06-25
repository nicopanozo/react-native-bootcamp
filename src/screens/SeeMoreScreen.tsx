import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { theme } from '../config/theme';
import TextComponent from '../components/Text';
import MovieCard from '../components/MovieCard';
import {
  fetchTopRatedMovies,
  fetchMarvelMovies,
  fetchActionMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
  fetchPopularMovies,
} from '../api/tmdb';
import { Movie } from '../types';

type SeeMoreScreenRouteProp = RouteProp<RootStackParamList, 'SeeMore'>;
type ListItem = Movie | { id: string; empty: true };

const { width } = Dimensions.get('window');
const numColumns = 3;
const movieWidth = (width - 48) / numColumns;

const SeeMoreScreen = () => {
  const route = useRoute<SeeMoreScreenRouteProp>();
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

  const totalItems = movies.length;
  const numEmptyItems =
    totalItems % numColumns === 0 ? 0 : numColumns - (totalItems % numColumns);

  const extendedMovies: ListItem[] = [
    ...movies,
    ...Array.from({ length: numEmptyItems }, (_, index) => ({
      id: `empty-${index}`,
      empty: true as true,
    })),
  ];

  const renderMovieItem = ({ item }: { item: ListItem }) => {
    if ('empty' in item) {
      return <View style={styles.placeholder} />;
    }

    return (
      <View style={{ width: movieWidth }}>
        <MovieCard movie={item} isFirst={false} isLast={false} />
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.colors.darkLight}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.secondary} />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.colors.darkLight}
        />
        <View style={styles.errorContainer}>
          <TextComponent
            text={error}
            variant="body"
            color={theme.colors.white}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.darkLight}
      />
      <FlatList
        data={extendedMovies}
        renderItem={renderMovieItem}
        keyExtractor={item => item.id.toString()}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.darkLight,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.darkLight,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.darkLight,
    padding: 20,
  },
  listContent: {
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  placeholder: {
    width: movieWidth,
    height: movieWidth * 1.5 + 40,
    opacity: 0,
    marginBottom: 8,
  },
});

export default SeeMoreScreen;
