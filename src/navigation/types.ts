export type RootStackParamList = {
  Main: { screen?: keyof MainTabParamList; params?: object };
  MovieDetails: { movieId: number };
  SeeMore: {
    category: string;
    redirectTo?: keyof MainTabParamList;
  };
};

export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Wishlist: undefined;
  Profile: undefined;
};
