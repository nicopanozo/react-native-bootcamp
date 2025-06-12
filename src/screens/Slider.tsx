// src/components/Slider.tsx
import React from 'react';
import { ScrollView, Image, StyleSheet, Text, View } from 'react-native';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const Slider = ({ movies }: { movies: any[] }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
    >
      {movies.map(movie => (
        <View key={movie.id} style={styles.card}>
          <Image
            source={{
              uri: `${IMAGE_BASE_URL}${movie.backdrop_path || movie.poster_path}`,
            }}
            style={styles.image}
          />
          <Text style={styles.title} numberOfLines={1}>
            {movie.title}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Slider;

const styles = StyleSheet.create({
  scroll: {
    paddingVertical: 10,
  },
  card: {
    marginHorizontal: 10,
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  title: {
    marginTop: 0,
    paddingVertical: 8,
    paddingHorizontal: 8,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    backgroundColor: '#fff',
  },
});
