import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {QUERY_FAV_MOVIES_DETAIL} from './queries';
import {ADD_FAV_MOVIE, REMOVE_FAV_MOVIE} from './mutations';

import Auth from './auth';

const FavoriteMoviesContext = createContext();


export default function FavoriteMoviesProvider ({ children }) {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [addFavoriteMovieMutation, {error_add_fav, data_addfav}] = useMutation(ADD_FAV_MOVIE); 
  const [removeFavoriteMovieMutation, {error_rmv_fav, data_rmvfav}] = useMutation(REMOVE_FAV_MOVIE); 

  if (Auth.loggedIn()) {
    const { data, loading, error } = useQuery(QUERY_FAV_MOVIES_DETAIL); 
    if (error) console.log(JSON.stringify(error, null, 2));
    
    useEffect(() => {
      if(data && !loading) {
        setFavoriteMovies(data.favMoviesDetail); 
      }
    }, [data, loading]);
  }


  const addFavoriteMovie = async (movie) => {
    setFavoriteMovies((prevMovies) => [...prevMovies, movie]);
    try {
        await addFavoriteMovieMutation({
        variables: { movieId: movie.id },

        update: (cache) => {
          // Update the local cache after a successful mutation
          const currentData = cache.readQuery({ 
            query: QUERY_FAV_MOVIES_DETAIL
          });
          const updatedData = {
            favMoviesDetail: [...currentData.favMoviesDetail, movie],
          };
          cache.writeQuery({
            query: QUERY_FAV_MOVIES_DETAIL,
            data: updatedData,
          });
        },
      });
      return true;
    } catch (error) {
      setFavoriteMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movie.id));
      console.error("Failed to add favorite movie:", JSON.stringify(error, null, 2));
      return false;
    }
  };

  const removeFavoriteMovie = async (movie) => {
    setFavoriteMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movie.id));

    try {
      await removeFavoriteMovieMutation({
        variables: { movieId: movie.id },
        update: (cache) => {
          const existingData = cache.readQuery({ query: QUERY_FAV_MOVIES_DETAIL });
          const updatedData = {
            favMoviesDetail: existingData.favMoviesDetail.filter((m) => m.id !== movie.id),
          };
          cache.writeQuery({
            query: QUERY_FAV_MOVIES_DETAIL,
            data: updatedData,
          });
        },
      });
      return true;
    } catch (error) {
      setFavoriteMovies((prevMovies) => [...prevMovies, movie]); // Add the movie back
      console.error("Failed to remove favorite movie:", JSON.stringify(error, null, 2));
      return false;
    }
  };

  const isFav = (movie) => {
    return favoriteMovies && favoriteMovies.some((favMovie) => favMovie.id === movie.id);
  };

  return (
    <FavoriteMoviesContext.Provider
      value={{
        favoriteMovies,
        addFavoriteMovie,
        removeFavoriteMovie,
        isFav,
      }}
    >
      {children}
    </FavoriteMoviesContext.Provider>
  );
};

export const useFavoriteMovies = () => useContext(FavoriteMoviesContext);