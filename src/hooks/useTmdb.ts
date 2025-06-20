import { useState } from 'react';
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  fetchNowPlayingMovies,
  fetchTrendingMovies,
  fetchMarvelMovies,
  fetchActionMovies,
  fetchMoviesByGenre,
} from '../api/tmdb';

// You can replace "any" with your explicit movie type if available.
type Movie = any;
type FetchFunction = () => Promise<Movie[]>;

const useTmdb = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchMovies = async (fetchFunction: FetchFunction): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const results = await fetchFunction();
      setMovies(results);
    } catch (err: unknown) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    movies,
    loading,
    error,
    fetchPopular: () => fetchMovies(fetchPopularMovies),
    fetchTopRated: () => fetchMovies(fetchTopRatedMovies),
    fetchUpcoming: () => fetchMovies(fetchUpcomingMovies),
    fetchNowPlaying: () => fetchMovies(fetchNowPlayingMovies),
    fetchTrending: (timeWindow: 'day' | 'week') =>
      fetchMovies(() => fetchTrendingMovies(timeWindow)),
    fetchMarvel: () => fetchMovies(fetchMarvelMovies),
    fetchAction: () => fetchMovies(fetchActionMovies),
    fetchByGenre: (genreId: number) =>
      fetchMovies(() => fetchMoviesByGenre(genreId)),
  };
};

export default useTmdb;
