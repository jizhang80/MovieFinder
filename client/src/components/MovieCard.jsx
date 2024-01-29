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

import { useFavoriteMovies } from '../utils/FavoriteMoviesContext';

export default function MovieCard({movie}) {
  // about movie image, please ref: https://developer.themoviedb.org/docs/image-basics
  const imageUrl = movie.poster_path?`https://image.tmdb.org/t/p/w500/${movie.poster_path}`:`/No_image_available.png`;
  const { isFav, addFavoriteMovie, removeFavoriteMovie } = useFavoriteMovies();
  const [favBtnColor, setfavBtnColor] = useState(isFav(movie) ? '#98002e' : '');

  useEffect(() => {
    setfavBtnColor(isFav(movie) ? '#98002e' : '');
  }, [movie, isFav]);

  const toggleFav = async () => {
    if (isFav(movie)) {
      console.log("remove")
      const success = await removeFavoriteMovie(movie);
      if (success) setfavBtnColor('');
    } else {
      console.log("add")
      const success = await addFavoriteMovie(movie);
      if (success) setfavBtnColor('#98002e');
    }
  };

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
            <IconButton aria-label="add to favorites" onClick={toggleFav}>
              <FavoriteIcon sx={{color:favBtnColor}}/>
            </IconButton>
          </CardActions>
        </Card>
    </Stack>
  );
}