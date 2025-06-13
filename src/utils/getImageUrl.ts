import Constants from 'expo-constants';

const BASE_IMAGE_URL =
  Constants.expoConfig?.extra?.tmdbS3Url ?? 'https://image.tmdb.org/t/p/';

type ImageSize =
  | 'w92'
  | 'w154'
  | 'w185'
  | 'w342'
  | 'w500'
  | 'w780'
  | 'original';

/**
 * Devuelve la URL completa de una imagen desde TMDB.
 * @param path - El poster_path o backdrop_path obtenido desde la API.
 * @param size - Tamaño deseado (por defecto: 'w500').
 * @returns URL completa lista para usarse en un <Image />
 */
export const getImageUrl = (
  path: string | null,
  size: ImageSize = 'w500',
): string => {
  if (!path) return '';
  return `${BASE_IMAGE_URL}${size}${path}`;
};
