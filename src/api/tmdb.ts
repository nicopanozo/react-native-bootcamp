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

// Existing function
export const fetchPopularMovies = async () => {
  const { data } = await tmdb.get('/movie/popular');
  return data.results;
};

// New API functions
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

// Marvel Studios movies (example using discover endpoint)
export const fetchMarvelMovies = async () => {
  const { data } = await tmdb.get('/discover/movie', {
    params: {
      with_companies: '420', // Marvel Studios company ID
      sort_by: 'popularity.desc',
    },
  });
  return data.results;
};

// Action movies (example using genres)
export const fetchActionMovies = async () => {
  const { data } = await tmdb.get('/discover/movie', {
    params: {
      with_genres: '28', // Action genre ID
      sort_by: 'popularity.desc',
    },
  });
  return data.results;
};

export const fetchMoviesByGenre = async (genreId: number) => {
  const { data } = await tmdb.get('/discover/movie', {
    params: {
      with_genres: genreId.toString(),
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
