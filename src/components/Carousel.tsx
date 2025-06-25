import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Carousel, {
  Pagination,
  ICarouselInstance,
} from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';

import { fetchPopularMovies, fetchMovieDetails } from '../api/tmdb';
import CustomButton from './CustomButton';
import CustomSnackbar from './CustomSnackbar';
import TextComponent from './Text';
import CustomModal from './CustomModal';
import { getImageUrl } from '../utils/getImageUrl';
import { colors } from '../config/colors';
import { theme } from '../config/theme';
import { useWishlist } from '../context/WishlistContext';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../navigation/types';
import { Movie } from '../types';

const { width, height } = Dimensions.get('window');
const CAROUSEL_HEIGHT = height * 0.6;
const VISIBLE_SLIDES = 5;
const AUTO_PLAY_INTERVAL = 2000;
const SCROLL_DURATION = 800;

const CarouselComponent: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [snackbarIcon, setSnackbarIcon] = useState<string | undefined>(
    undefined,
  );
  const [snackbarIconColor, setSnackbarIconColor] = useState<
    string | undefined
  >(undefined);

  const carouselRef = useRef<ICarouselInstance>(null);
  const progress = useSharedValue(0);

  const { addToWishlist, wishlist } = useWishlist();
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();

  const loadMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPopularMovies();
      const topRated = data
        .sort((a: Movie, b: Movie) => b.vote_average - a.vote_average)
        .slice(0, VISIBLE_SLIDES);
      setMovies(topRated);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('No se pudieron cargar las películas.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  const [selectedMovieDetails, setSelectedMovieDetails] = useState<any | null>(
    null,
  );

  const [selectedMovieForModal, setSelectedMovieForModal] =
    useState<Movie | null>(null);

  const currentMovie = useMemo(
    () => movies[activeIndex],
    [movies, activeIndex],
  );

  const handleOpenModal = useCallback(async () => {
    if (!currentMovie) return;
    try {
      setSelectedMovieForModal(currentMovie);
      const details = await fetchMovieDetails(currentMovie.id);
      setSelectedMovieDetails(details);
      setModalVisible(true);
    } catch (error) {
      console.error('Failed to fetch movie details:', error);
    }
  }, [currentMovie]);

  const handleCloseModal = useCallback(() => setModalVisible(false), []);

  const handleWishlist = useCallback(() => {
    if (currentMovie) {
      const alreadyInWishlist = wishlist.some(m => m.id === currentMovie.id);
      if (alreadyInWishlist) {
        setSnackbarText(`"${currentMovie.title}" is already in your Wishlist`);
        setSnackbarIcon('circle-info');
        setSnackbarIconColor('#f1c40f');
      } else {
        addToWishlist(currentMovie);
        setSnackbarText(`"${currentMovie.title}" added to your Wishlist`);
        setSnackbarIcon('circle-check');
        setSnackbarIconColor('#2ecc71');
      }
      setSnackbarVisible(true);
    }
  }, [currentMovie, addToWishlist, wishlist]);

  const handleMyList = useCallback(() => {
    navigation.navigate('Wishlist');
  }, []);

  const handleDiscover = useCallback(() => {
    navigation.navigate('Search');
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Movie }) => (
      <View style={styles.card} key={item.id}>
        <Image
          source={{
            uri: getImageUrl(
              item.poster_path ?? item.backdrop_path ?? '',
              'original',
            ),
          }}
          style={styles.image}
          resizeMode="cover"
          accessibilityLabel={item.title}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.95)']}
          style={styles.bottomGradient}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.95)', 'transparent']}
          style={styles.topGradient}
        />
      </View>
    ),
    [],
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <TextComponent text={error} color={colors.white} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.carouselWrapper}>
        <Carousel
          ref={carouselRef}
          width={width}
          height={CAROUSEL_HEIGHT}
          data={movies}
          autoPlay
          autoPlayInterval={AUTO_PLAY_INTERVAL}
          onProgressChange={progress}
          scrollAnimationDuration={SCROLL_DURATION}
          onSnapToItem={index => setActiveIndex(index)}
          renderItem={renderItem}
        />

        <Pagination.Basic
          progress={progress}
          data={movies}
          size={10}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
          containerStyle={styles.paginationContainer}
          onPress={i =>
            carouselRef.current?.scrollTo({
              count: i - progress.value,
              animated: true,
            })
          }
        />

        <View style={styles.overlayContainer}>
          <View style={styles.tabContainer}>
            <TouchableOpacity onPress={handleMyList} accessibilityRole="button">
              <TextComponent
                text="My List"
                variant="h1"
                color={colors.white}
                style={styles.tabText}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDiscover}
              accessibilityRole="button"
            >
              <TextComponent
                text="Discover"
                variant="h1"
                color={colors.white}
                style={styles.tabText}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <CustomButton
              text="+ Wishlist"
              onPress={handleWishlist}
              color={colors.darkLight}
              textColor={colors.white}
            />
            <CustomButton
              text="Details"
              onPress={handleOpenModal}
              color={colors.primary}
              textColor="#000"
            />
          </View>
        </View>
      </View>

      <CustomModal
        visible={modalVisible}
        onClose={handleCloseModal}
        title={selectedMovieForModal?.title || ''}
        overview={selectedMovieForModal?.overview || ''}
        rating={selectedMovieForModal?.vote_average || 0}
        releaseDate={selectedMovieForModal?.release_date}
        language={selectedMovieForModal?.original_language}
        posterPath={selectedMovieForModal?.poster_path ?? undefined}
        runtime={selectedMovieDetails?.runtime ?? 0}
        genres={selectedMovieDetails?.genres?.map((g: any) => g.name) ?? []}
      />

      <CustomSnackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        message={snackbarText}
        iconName={snackbarIcon}
        iconColor={snackbarIconColor}
        bottomOffset={130}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkMode,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselWrapper: {
    position: 'relative',
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '45%',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '45%',
  },
  paginationContainer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    backgroundColor: colors.white,
    borderRadius: 50,
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: colors.primary,
    borderRadius: 50,
    marginHorizontal: 0,
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  tabText: {
    fontFamily: theme.fonts.medium,
    fontSize: theme.fontSizes.lg,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
});

export default React.memo(CarouselComponent);
