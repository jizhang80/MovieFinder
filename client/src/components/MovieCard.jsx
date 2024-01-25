import * as React from 'react';
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
import { Link } from 'react-router-dom';
import { EDIT_MOVIE } from '../utils/mutations';

const [editMovie] = useMutation(EDIT_MOVIE);



export default function MovieCard({movie}) {
  // about movie image, please ref: https://developer.themoviedb.org/docs/image-basics
  const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  return (
    <Stack spacing={4}>
        <Card sx={{ maxWidth: 345 }}>
          <Link to={`/movie/${movie.id}`}>
          <CardMedia
            component="img"
            height="194"
            image={imageUrl}
            alt={movie.title}
          />
          <CardContent>
              <Typography variant="h5" gutterBottom>
                    {movie.title}
              </Typography>
          </CardContent>
          </Link>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites" onClick = {() => editMovie({variables: {movieId: movie.id}})}>
              <FavoriteIcon />
            </IconButton>
          </CardActions>
        </Card>
    </Stack>
  );
}