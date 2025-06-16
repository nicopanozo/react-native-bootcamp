import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Carousel, {
  Pagination,
  ICarouselInstance,
} from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import { fetchPopularMovies } from '../api/tmdb';
import Button from './Button';
import TextComponent from './Text';
import { getImageUrl } from '../utils/getImageUrl';
import { colors } from '../config/colors';
import { theme } from '../config/theme';

const { width, height } = Dimensions.get('window');

interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average: number;
}

const CarouselComponent = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchPopularMovies();
        const topRatedMovies = data
          .sort((a: Movie, b: Movie) => b.vote_average - a.vote_average)
          .slice(0, 5);
        setMovies(topRatedMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  const handleDetailsPress = () => {
    setModalVisible(true);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
    );
  }

  const currentMovie = movies[activeIndex];

  return (
    <View style={styles.container}>
      <View style={styles.carouselWrapper}>
        <Carousel
          ref={ref}
          width={width}
          height={height * 0.6}
          data={movies}
          onProgressChange={progress}
          scrollAnimationDuration={800}
          onSnapToItem={index => setActiveIndex(index)}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={{
                  uri: getImageUrl(
                    item.backdrop_path || item.poster_path || '',
                    'original',
                  ),
                }}
                style={styles.image}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', 'rgba(0, 0, 0, 0.95)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 0.8 }}
                style={styles.gradient}
              />
              <View style={styles.overlayContainer}>
                <View style={styles.titleRow}>
                  <TextComponent
                    text="My List"
                    variant="h1"
                    color={colors.white}
                    style={styles.titleText}
                  />
                  <TextComponent
                    text="Discover"
                    variant="h1"
                    color={colors.white}
                    style={styles.titleText}
                  />
                </View>
              </View>
            </View>
          )}
        />
        <Pagination.Basic
          progress={progress}
          data={movies}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
          containerStyle={styles.paginationContainer}
          size={10}
          onPress={index => {
            ref.current?.scrollTo({
              count: index - progress.value,
              animated: true,
            });
          }}
        />
        <View style={styles.staticButtons}>
          <Button
            color={colors.darkLight}
            textColor={colors.white}
            text="+ Wishlist"
            onPress={() => console.log('Wishlist pressed')}
          />
          <Button
            color={colors.primary}
            textColor="#000"
            text="Details"
            onPress={handleDetailsPress}
          />
        </View>
      </View>

      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <TextComponent
              text={currentMovie.title}
              variant="h1"
              color={colors.primary}
              style={styles.modalTitle}
            />
            <TextComponent
              text={currentMovie.overview}
              color={colors.white}
              style={styles.modalText}
            />
            <TextComponent
              text={`Rating: ${currentMovie.vote_average}`}
              color={colors.white}
              style={styles.modalText}
            />
            <Button
              text="Cerrar"
              color={colors.primary}
              textColor="#000"
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            />
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkMode,
    alignItems: 'center',
    paddingTop: 10,
  },
  carouselWrapper: {
    position: 'relative',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '45%',
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 16,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 50,
    marginBottom: 50,
  },
  titleText: {
    fontFamily: theme.fonts.medium,
    fontSize: theme.fontSizes.lg,
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
  paginationContainer: {
    marginTop: 12,
    flexDirection: 'row',
  },
  staticButtons: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: colors.darkMode,
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 350,
  },
  modalTitle: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSizes.lg,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalText: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.md,
    color: colors.white,
    marginBottom: 10,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 15,
    alignSelf: 'center',
  },
});

export default CarouselComponent;
