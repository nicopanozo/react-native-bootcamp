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
  fetchMoviesByGenre,
  fetchTopRatedMovies,
  fetchMarvelMovies,
  fetchActionMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
  fetchPopularMovies,
} from '../api/tmdb';
import { Movie } from '../types';

type SeeMoreRouteProp = RouteProp<RootStackParamList, 'SeeMore'>;
type ListItem = Movie | { id: string; empty: true };

const { width } = Dimensions.get('window');
const numColumns = 3;
const movieWidth = (width - 48) / numColumns;

const SeeMoreScreen = () => {
  const { genreId, endpoint } = useRoute<SeeMoreRouteProp>().params;
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      let fetchedMovies: Movie[] = [];
      try {
        if (typeof genreId === 'number') {
          fetchedMovies = await fetchMoviesByGenre(genreId);
        } else if (endpoint) {
          switch (endpoint) {
            case 'marvel':
              fetchedMovies = await fetchMarvelMovies();
              break;
            case 'topRated':
              fetchedMovies = await fetchTopRatedMovies();
              break;
            case 'action':
              fetchedMovies = await fetchActionMovies();
              break;
            case 'trending':
              fetchedMovies = await fetchTrendingMovies();
              break;
            case 'upcoming':
              fetchedMovies = await fetchUpcomingMovies();
              break;
            case 'popular':
            default:
              fetchedMovies = await fetchPopularMovies();
          }
        } else {
          fetchedMovies = await fetchPopularMovies();
        }
      } catch (e) {
        console.error(e);
      } finally {
        setMovies(fetchedMovies);
        setLoading(false);
      }
    })();
  }, [genreId, endpoint]);

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
    if ('empty' in item) return <View style={styles.placeholder} />;
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
