import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import TextComponent from '../components/Text';
import { colors } from '../config/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { searchMovies } from '../api/tmdb';
import { Movie } from '../types';
import MovieCard from '../components/MovieCard';
import ScreenHeader from '../components/ScreenHeader';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    timeoutRef.current = setTimeout(async () => {
      try {
        const movies = await searchMovies(query.trim());
        setResults(movies);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [query]);

  const renderItem = ({ item, index }: { item: Movie; index: number }) => (
    <MovieCard
      movie={item}
      isFirst={index === 0}
      isLast={index === results.length - 1}
    />
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <ScreenHeader title="Search" />

        <TextInput
          style={styles.input}
          placeholder="Search movies..."
          placeholderTextColor="#aaa"
          value={query}
          onChangeText={setQuery}
        />

        {loading ? (
          <ActivityIndicator
            color={colors.primary}
            size="large"
            style={{ marginTop: 20 }}
          />
        ) : results.length === 0 ? (
          <TextComponent
            text={
              query.trim() === ''
                ? 'Start typing to search...'
                : 'No results found.'
            }
            color={colors.white}
            style={styles.noResults}
          />
        ) : (
          <FlatList
            data={results}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            numColumns={3}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.resultsContainer}
          />
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkMode,
    paddingHorizontal: 16,
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
