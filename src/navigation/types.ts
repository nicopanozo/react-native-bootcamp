export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Wishlist: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Main: { screen?: keyof MainTabParamList; params?: object };
  MovieDetails: { movieId: number };
  SeeMore: {
    title: string;
    genreId?: number | null;
    endpoint?:
      | 'marvel'
      | 'topRated'
      | 'action'
      | 'trending'
      | 'upcoming'
      | 'popular';
    redirectTo?: keyof MainTabParamList;
  };
};
