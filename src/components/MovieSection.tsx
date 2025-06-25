import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import TextComponent from './Text';
import MovieCard from './MovieCard';
import { theme } from '../config/theme';
import { RootStackParamList } from '../navigation/types';
import { Movie } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  onSeeMore?: () => void;
  loading?: boolean;
}

const MovieSection: React.FC<MovieSectionProps> = ({
  title,
  movies,
  onSeeMore,
  loading = false,
}) => {
  const navigation = useNavigation<NavigationProp>();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.headerContainer}>
          <TextComponent text={title} variant="h2" color={theme.colors.white} />
        </View>
        <ActivityIndicator size="large" color={theme.colors.secondary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TextComponent text={title} variant="h1" color={theme.colors.white} />
        {onSeeMore && (
          <Pressable
            onPress={() =>
              navigation.navigate('SeeMore', {
                category: title,
                redirectTo: 'Search',
              })
            }
          >
            <TextComponent
              text="See more"
              variant="h2"
              color={theme.colors.primary}
            />
          </Pressable>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        {movies.map((movie, index) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFirst={index === 0}
            isLast={index === movies.length - 1}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  loadingContainer: {
    marginVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
    paddingVertical: 15,
  },
  scrollView: {
    paddingLeft: 20,
  },
  scrollContent: {
    paddingRight: 20,
  },
});

export default MovieSection;
