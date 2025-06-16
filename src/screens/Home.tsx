import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import CarouselComponent from '../components/Carousel';
import MovieSection from '../components/MovieSection';
import { Provider as PaperProvider } from 'react-native-paper';
import {
  fetchTopRatedMovies,
  fetchMarvelMovies,
  fetchActionMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from '../api/tmdb';
import { theme } from '../config/theme';

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
}

interface MovieSections {
  marvelMovies: Movie[];
  bestMovies: Movie[];
  actionMovies: Movie[];
  trendingMovies: Movie[];
  upcomingMovies: Movie[];
}

const Home = () => {
  const [movieSections, setMovieSections] = useState<MovieSections>({
    marvelMovies: [],
    bestMovies: [],
    actionMovies: [],
    trendingMovies: [],
    upcomingMovies: [],
  });
  const [loading, setLoading] = useState({
    marvel: true,
    best: true,
    action: true,
    trending: true,
    upcoming: true,
  });

  useEffect(() => {
    const loadMovieSections = async () => {
      try {
        // Load Marvel movies
        const marvelData = await fetchMarvelMovies();
        setMovieSections(prev => ({
          ...prev,
          marvelMovies: marvelData.slice(0, 10),
        }));
        setLoading(prev => ({ ...prev, marvel: false }));

        // Load best movies (top rated)
        const bestData = await fetchTopRatedMovies();
        setMovieSections(prev => ({
          ...prev,
          bestMovies: bestData.slice(0, 10),
        }));
        setLoading(prev => ({ ...prev, best: false }));

        // Load action movies
        const actionData = await fetchActionMovies();
        setMovieSections(prev => ({
          ...prev,
          actionMovies: actionData.slice(0, 10),
        }));
        setLoading(prev => ({ ...prev, action: false }));

        // Load trending movies
        const trendingData = await fetchTrendingMovies();
        setMovieSections(prev => ({
          ...prev,
          trendingMovies: trendingData.slice(0, 10),
        }));
        setLoading(prev => ({ ...prev, trending: false }));

        // Load upcoming movies
        const upcomingData = await fetchUpcomingMovies();
        setMovieSections(prev => ({
          ...prev,
          upcomingMovies: upcomingData.slice(0, 10),
        }));
        setLoading(prev => ({ ...prev, upcoming: false }));
      } catch (error) {
        console.error('Error fetching movie sections:', error);
        // Reset all loading states on error
        setLoading({
          marvel: false,
          best: false,
          action: false,
          trending: false,
          upcoming: false,
        });
      }
    };

    loadMovieSections();
  }, []);

  return (
    <PaperProvider>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Carousel at the top */}

        <View style={styles.carouselContainer}>
          <CarouselComponent />
        </View>

        {/* Movie sections */}
        <View style={styles.sectionsContainer}>
          <MovieSection
            title="Marvel studios"
            movies={movieSections.marvelMovies}
            loading={loading.marvel}
            onSeeMore={() => console.log('See more Marvel movies')}
          />

          <MovieSection
            title="Best movies"
            movies={movieSections.bestMovies}
            loading={loading.best}
            onSeeMore={() => console.log('See more best movies')}
          />

          <MovieSection
            title="Action movies"
            movies={movieSections.actionMovies}
            loading={loading.action}
            onSeeMore={() => console.log('See more action movies')}
          />

          <MovieSection
            title="Trending now"
            movies={movieSections.trendingMovies}
            loading={loading.trending}
            onSeeMore={() => console.log('See more trending movies')}
          />

          <MovieSection
            title="Coming soon"
            movies={movieSections.upcomingMovies}
            loading={loading.upcoming}
            onSeeMore={() => console.log('See more upcoming movies')}
          />
        </View>

        {/* Bottom spacing for safe scrolling */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.darkMode,
  },
  contentContainer: {
    flexGrow: 1,
  },
  carouselContainer: {
    // Removed fixed height to let carousel determine its own height
    marginBottom: 0, // No margin to prevent gap
  },
  sectionsContainer: {
    flex: 1,
    paddingTop: 10, // Small padding to separate from carousel
  },
  bottomSpacing: {
    height: 100, // Extra space at bottom for comfortable scrolling
  },
});

export default Home;
