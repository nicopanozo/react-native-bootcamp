import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TextComponent from './Text';
import { getImageUrl } from '../utils/getImageUrl';
import { theme } from '../config/theme';

const { width } = Dimensions.get('window');

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
}

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
          <Pressable onPress={onSeeMore}>
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

interface MovieCardProps {
  movie: Movie;
  isFirst: boolean;
  isLast: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isFirst, isLast }) => {
  const imageUrl = getImageUrl(movie.poster_path || movie.backdrop_path || '');
  const rating = movie.vote_average.toFixed(1);

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
  },
  scrollView: {
    paddingLeft: 20,
  },
  scrollContent: {
    paddingRight: 20,
  },
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
    lineHeight: 16,
    textAlign: 'center',
  },
});

export default MovieSection;
