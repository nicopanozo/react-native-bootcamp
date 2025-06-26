import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import TextComponent from '../components/Text';
import { colors } from '../config/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  fetchNowPlayingMovies,
  fetchTrendingMovies,
} from '../api/tmdb';
import { Movie } from '../types';
import MovieCard from '../components/MovieCard';

const SearchScreen = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllMovies = async () => {
      try {
        const [popular, topRated, upcoming, nowPlaying, trending] =
          await Promise.all([
            fetchPopularMovies(),
            fetchTopRatedMovies(),
            fetchUpcomingMovies(),
            fetchNowPlayingMovies(),
            fetchTrendingMovies('week'),
          ]);

        // Merge all into a unique set (by id)
        const merged = [
          ...popular,
          ...topRated,
          ...upcoming,
          ...nowPlaying,
          ...trending,
        ];
        const uniqueMovies = Array.from(
          new Map(merged.map(m => [m.id, m])).values(),
        );

        setAllMovies(uniqueMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAllMovies();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredMovies([]);
    } else {
      const filtered = allMovies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredMovies(filtered);
    }
  }, [searchTerm, allMovies]);

  const renderItem = ({ item, index }: { item: Movie; index: number }) => (
    <MovieCard
      movie={item}
      isFirst={index === 0}
      isLast={index === filteredMovies.length - 1}
    />
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <SafeAreaView>
          <TextComponent
            text="Search"
            color={colors.primary}
            variant="h1"
            style={styles.title}
          />

          <TextInput
            style={styles.input}
            placeholder="Search movies..."
            placeholderTextColor="#aaa"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />

          {loading ? (
            <ActivityIndicator
              color={colors.primary}
              size="large"
              style={{ marginTop: 20 }}
            />
          ) : filteredMovies.length === 0 && searchTerm.trim() !== '' ? (
            <TextComponent
              text="No results found."
              color={colors.white}
              style={styles.noResults}
            />
          ) : (
            <FlatList
              data={filteredMovies}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
              numColumns={3}
              columnWrapperStyle={styles.row}
              contentContainerStyle={styles.resultsContainer}
            />
          )}
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkMode,
    paddingHorizontal: 16,
  },
  title: {
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    backgroundColor: colors.darkLight,
    borderRadius: 8,
    padding: 10,
    color: colors.white,
    fontSize: 16,
    marginBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  resultsContainer: {
    paddingBottom: 80,
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SearchScreen;
