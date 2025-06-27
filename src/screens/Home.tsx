import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CarouselComponent from '../components/Carousel';
import MovieSection from '../components/MovieSection';
import TopNavigation from '../components/TopNavigation';
import { Provider as PaperProvider } from 'react-native-paper';
import Ad from '../components/Ad';
import { Movie } from '../types';
import {
  fetchTopRatedMovies,
  fetchMarvelMovies,
  fetchActionMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
  fetchMoviesByGenre,
} from '../api/tmdb';
import { theme } from '../config/theme';
import { colors } from '../config/colors';
import { RootStackParamList } from '../navigation/types';
import {
  CATEGORIES,
  CATEGORY_GENRE_MAP,
  Category,
} from '../constants/categories';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

interface MovieSections {
  marvelMovies: Movie[];
  bestMovies: Movie[];
  actionMovies: Movie[];
  trendingMovies: Movie[];
  upcomingMovies: Movie[];
}

const Home = () => {
  const navigation = useNavigation<NavigationProp>();

  const [movieSections, setMovieSections] = useState<MovieSections>({
    marvelMovies: [],
    bestMovies: [],
    actionMovies: [],
    trendingMovies: [],
    upcomingMovies: [],
  });
  const [loadingSections, setLoadingSections] = useState({
    marvel: true,
    best: true,
    action: true,
    trending: true,
    upcoming: true,
  });
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [categoryMovies, setCategoryMovies] = useState<Movie[]>([]);
  const [loadingCategory, setLoadingCategory] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [mv, best, action, trending, upcoming] = await Promise.all([
          fetchMarvelMovies(),
          fetchTopRatedMovies(),
          fetchActionMovies(),
          fetchTrendingMovies(),
          fetchUpcomingMovies(),
        ]);
        setMovieSections({
          marvelMovies: mv.slice(0, 10),
          bestMovies: best.slice(0, 10),
          actionMovies: action.slice(0, 10),
          trendingMovies: trending.slice(0, 10),
          upcomingMovies: upcoming.slice(0, 10),
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingSections({
          marvel: false,
          best: false,
          action: false,
          trending: false,
          upcoming: false,
        });
      }
    })();
  }, []);

  useEffect(() => {
    const genreId = CATEGORY_GENRE_MAP[selectedCategory];
    if (genreId === null) return;

    setLoadingCategory(true);
    (async () => {
      try {
        const data = await fetchMoviesByGenre(genreId);
        setCategoryMovies(data.slice(0, 20));
      } catch (e) {
        console.error(e);
        setCategoryMovies([]);
      } finally {
        setLoadingCategory(false);
      }
    })();
  }, [selectedCategory]);

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
  };

  return (
    <PaperProvider>
      <View style={styles.mainContainer}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.darkMode}
          translucent={false}
        />

        <TopNavigation onCategoryChange={handleCategoryChange} />

        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.carouselContainer}>
            <CarouselComponent />
          </View>

          <View style={styles.sectionsContainer}>
            {selectedCategory === 'All' ? (
              <>
                <MovieSection
                  title="Marvel studios"
                  movies={movieSections.marvelMovies}
                  loading={loadingSections.marvel}
                  onSeeMore={() =>
                    navigation.navigate('SeeMore', {
                      title: 'Marvel studios',
                      endpoint: 'marvel',
                    })
                  }
                />
                <MovieSection
                  title="Best movies"
                  movies={movieSections.bestMovies}
                  loading={loadingSections.best}
                  onSeeMore={() =>
                    navigation.navigate('SeeMore', {
                      title: 'Best movies',
                      endpoint: 'topRated',
                    })
                  }
                />
                <MovieSection
                  title="Action movies"
                  movies={movieSections.actionMovies}
                  loading={loadingSections.action}
                  onSeeMore={() =>
                    navigation.navigate('SeeMore', {
                      title: 'Action movies',
                      endpoint: 'action',
                    })
                  }
                />
                <MovieSection
                  title="Trending now"
                  movies={movieSections.trendingMovies}
                  loading={loadingSections.trending}
                  onSeeMore={() =>
                    navigation.navigate('SeeMore', {
                      title: 'Trending now',
                      endpoint: 'trending',
                    })
                  }
                />
                <MovieSection
                  title="Coming soon"
                  movies={movieSections.upcomingMovies}
                  loading={loadingSections.upcoming}
                  onSeeMore={() =>
                    navigation.navigate('SeeMore', {
                      title: 'Coming soon',
                      endpoint: 'upcoming',
                    })
                  }
                />
              </>
            ) : (
              <MovieSection
                title={selectedCategory}
                movies={categoryMovies}
                loading={loadingCategory}
                onSeeMore={() =>
                  navigation.navigate('SeeMore', {
                    title: selectedCategory,
                    genreId: CATEGORY_GENRE_MAP[selectedCategory],
                  })
                }
              />
            )}
          </View>

          <Ad
            imageSource={require('../../assets/black-friday.png')}
            title="Black friday is here!"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra sociis pulvinar auctor nibh nibh iaculis id."
          />
          <View style={styles.bottomSpacing} />
        </ScrollView>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.darkMode,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.darkMode,
  },
  contentContainer: {
    flexGrow: 1,
  },
  carouselContainer: {
    marginBottom: 0,
    marginTop: -50,
  },
  sectionsContainer: {
    flex: 1,
    paddingTop: 10,
  },
  bottomSpacing: {
    height: 0,
  },
});

export default Home;
