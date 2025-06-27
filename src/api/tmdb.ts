import axios from 'axios';
import Constants from 'expo-constants';

const API_KEY = Constants.expoConfig?.extra?.tmdbApiKey;
const ACCESS_TOKEN = Constants.expoConfig?.extra?.tmdbAccessToken;
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json;charset=utf-8',
  },
});

tmdb.interceptors.request.use(config => {
  if (ACCESS_TOKEN) {
    config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
  }
  return config;
});

export const fetchPopularMovies = async () => {
  const { data } = await tmdb.get('/movie/popular');
  return data.results;
};

export const fetchTopRatedMovies = async () => {
  const { data } = await tmdb.get('/movie/top_rated');
  return data.results;
};

export const fetchUpcomingMovies = async () => {
  const { data } = await tmdb.get('/movie/upcoming');
  return data.results;
};

export const fetchNowPlayingMovies = async () => {
  const { data } = await tmdb.get('/movie/now_playing');
  return data.results;
};

export const fetchTrendingMovies = async (
  timeWindow: 'day' | 'week' = 'week',
) => {
  const { data } = await tmdb.get(`/trending/movie/${timeWindow}`);
  return data.results;
};

export const fetchMarvelMovies = async () => {
  const { data } = await tmdb.get('/discover/movie', {
    params: {
      with_companies: '420', // Marvel Studios company ID
      sort_by: 'popularity.desc',
    },
  });
  return data.results;
};

export const fetchActionMovies = async () => {
  const { data } = await tmdb.get('/discover/movie', {
    params: {
      with_genres: '28', // Action genre ID
      sort_by: 'popularity.desc',
    },
  });
  return data.results;
};

export const fetchMovieDetails = async (movieId: number) => {
  try {
    const { data } = await tmdb.get(`/movie/${movieId}`);
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw new Error('Failed to fetch movie details');
  }
};

export interface Genre {
  id: number;
  name: string;
}

export const fetchMovieGenres = async (): Promise<Genre[]> => {
  try {
    const { data } = await tmdb.get('/genre/movie/list');
    return data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw new Error('Failed to fetch genres');
  }
};

export const fetchMoviesByGenre = async (genreId: number | null) => {
  const params = genreId
    ? { with_genres: genreId.toString(), sort_by: 'popularity.desc' }
    : { sort_by: 'popularity.desc' };
  const { data } = await tmdb.get('/discover/movie', { params });
  return data.results;
};
