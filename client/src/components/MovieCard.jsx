import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Auth from '../utils/auth';

import { useFavoriteMovies } from '../utils/FavoriteMoviesContext';

export default function MovieCard({movie}) {
  const [isFav, setIsFav] = useState(false);

  // about movie image, please ref: https://developer.themoviedb.org/docs/image-basics
  const imageUrl = movie.poster_path?`https://image.tmdb.org/t/p/w500/${movie.poster_path}`:`/No_image_available.png`;
  const { favoriteMovies, addFavoriteMovie, removeFavoriteMovie } = useFavoriteMovies();

  useEffect(() => {
    // console.log("MovieCard",favoriteMovies, movie);
    setIsFav(favoriteMovies.some((m)=> m.id === movie.id));
  }, [favoriteMovies, movie]);

  const onToggleFav = async (movie) => {
    if (Auth.loggedIn()) {
      isFav? await removeFavoriteMovie(movie): await addFavoriteMovie(movie);
      setIsFav(!isFav);
    } else {
      alert("Please Login first!");
    }
  }

  return (
    <Stack sx={{ margin:2}}>
        <Card sx={{ maxWidth: 345, maxHeight:400 }}>
          <Link to={`/movie/${movie.id}`}>
          <CardMedia
            component="img"
            height="194"
            image={imageUrl}
            alt={movie.title}
          />
          <CardContent>
              <Typography variant="h6" gutterBottom>
                    {movie.title}
              </Typography>
          </CardContent>
          </Link>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites" onClick={()=>onToggleFav(movie)}>
              <FavoriteIcon sx={{color: isFav? '#98002e' : ''}}/>
            </IconButton>
          </CardActions>
        </Card>
    </Stack>
  );
}