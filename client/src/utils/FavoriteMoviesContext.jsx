import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {QUERY_SINGLE_USER} from './queries';
import {ADD_FAV_MOVIE, REMOVE_FAV_MOVIE} from './mutations';

import Auth from './auth';

const FavoriteMoviesContext = createContext();


export default function FavoriteMoviesProvider ({ children }) {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  
  const [addFavoriteMovieMutation, {error_add_fav, data_addfav}] = useMutation(ADD_FAV_MOVIE); 
  const [removeFavoriteMovieMutation, {error_rmv_fav, data_rmvfav}] = useMutation(REMOVE_FAV_MOVIE); 

  if (Auth.loggedIn()) {
    const { data, loading, error } = useQuery(QUERY_SINGLE_USER, {
      variables: {userId: Auth.getProfile().data._id}
    }); 
    useEffect(() => {
      if (data) {
        console.log(data, Auth.getProfile().data)
        setFavoriteMovies(data.favorite_movies); 
      }
    }, [data]);
  }
  

  const addFavoriteMovie = async (movie) => {

    setFavoriteMovies((prevMovies) => [...prevMovies, movie]);
    try {
        const {data} = await addFavoriteMovieMutation({
        variables: { movieId: movie.id.toString() },

        update: (cache) => {
          // Update the local cache after a successful mutation
          const data = cache.readQuery({ 
            query: QUERY_SINGLE_USER,
            variables: {userId: Auth.getProfile().data._id} 
          });
          cache.writeQuery({
            query: QUERY_SINGLE_USER,
            variables: {userId: Auth.getProfile().data._id},
            data: {
              ...data,
              favoriteMovies: [...data.favorite_movies, movie],
            },
          });
        },
      });
    } catch (error) {
      console.error("Failed to add favorite movie:", JSON.stringify(error, null, 2));
      setFavoriteMovies((prevMovies) => prevMovies.filter((m) => m.id !== movie.id));
    }
  };

  const removeFavoriteMovie = async (movie) => {
    setFavoriteMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movie.id));

    try {
      await removeFavoriteMovieMutation({
        variables: { movieId: movie.id.toString() },
        update: (cache) => {
          // Update the local cache after a successful mutation
          const data = cache.readQuery({ 
            query: QUERY_SINGLE_USER,
            variables: {userId: Auth.getProfile().data._id} 
          });
          cache.writeQuery({
            query: QUERY_SINGLE_USER,
            data: {
              ...data,
              favoriteMovies: data.favorite_movies.filter((m) => m.id !== movie.id),
            },
          });
        },
      });
    } catch (error) {
      console.error("Failed to remove favorite movie:", error);
      // Handle the error, possibly by rolling back the optimistic update
      setFavoriteMovies((prevMovies) => [...prevMovies, { id: movie.id }]); // Add the movie back
    }
  };

  const isFav = (movieId) => {
    return favoriteMovies.some((movie) => movie.id === movieId);
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