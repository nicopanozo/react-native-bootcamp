export const CATEGORIES = [
  'All',
  'Romance',
  'Crime',
  'Kids',
  'Horror',
] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_GENRE_MAP: Record<Category, number | null> = {
  All: null,
  Romance: 10749,
  Crime: 80,
  Kids: 10751,
  Horror: 27,
};
