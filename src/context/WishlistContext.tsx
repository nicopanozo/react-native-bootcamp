import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average: number;
}

interface WishlistContextProps {
  wishlist: Movie[];
  addToWishlist: (movie: Movie) => void;
  removeFromWishlist: (movieId: number) => void;
}

const WishlistContext = createContext<WishlistContextProps | undefined>(
  undefined,
);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Movie[]>([]);

  const addToWishlist = (movie: Movie) => {
    setWishlist(prev =>
      prev.some(m => m.id === movie.id) ? prev : [...prev, movie],
    );
  };

  const removeFromWishlist = (movieId: number) => {
    setWishlist(prev => prev.filter(m => m.id !== movieId));
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context)
    throw new Error('useWishlist must be used within a WishlistProvider');
  return context;
};
