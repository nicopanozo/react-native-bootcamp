// src/screens/Home.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  StyleSheet,
} from 'react-native';
import { fetchPopularMovies } from '../api/tmdb';
import Slider from './Slider';
import { SafeAreaView } from 'react-native-safe-area-context';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const Home = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPopularMovies()
      .then(setMovies)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Slider movies={movies.slice(0, 20)} />

      <FlatList
        data={movies}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image
              source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
              style={styles.image}
            />
            <Text style={styles.title}>{item.title}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  item: {
    marginVertical: 10,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 450,
    borderRadius: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
