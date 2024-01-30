//movie detial information here
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {useEffect, useState} from 'react';

import Box from '@mui/material/Box';
import { Stack } from '@mui/system';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import PercentageCircular from '../components/UI/PercentageCircular';
import { QUERY_MOVIEDETAIL } from '../utils/queries';
import Provider from '../components/UI/Provider';
import { useFavoriteMovies } from '../utils/FavoriteMoviesContext';
import Auth from '../utils/auth';


export default function MovieDetail() {
	const [isFav, setIsFav] = useState(false);
	const { favoriteMovies, addFavoriteMovie, removeFavoriteMovie } = useFavoriteMovies();
	//get movie data by GraphQL
	const { movieId } = useParams();
	const { loading, error, data } = useQuery(QUERY_MOVIEDETAIL, {
		variables: {movieId: movieId}
	});

	useEffect(() => {
    // console.log("MovieCard",favoriteMovies, movie);
    setIsFav(favoriteMovies.some((m)=> m.id === movieId));
  }, [favoriteMovies, movieId]);
	
	const movie = data?.movie || {};

	if (loading) {
		return (
		<Box sx={{ display: 'flex' }}>
			<p> loading... </p>
			<CircularProgress />
		</Box>
		);
	}

	if (error) console.log(JSON.stringify(error, null, 2));

	const imageUrl = movie.poster_path?`https://image.tmdb.org/t/p/w500/${movie.poster_path}`:`/No_image_available.png`;

	const onToggleFav = async (movie) => {
		if (Auth.loggedIn()) {
			isFav? await removeFavoriteMovie(movie): await addFavoriteMovie(movie);
			setIsFav(!isFav);
		} else {
			alert("Please Login first!");
		}
	} 

	//return a temp output, will edit it later
	return (
		<Box
			sx={{
				p:2,
				m:2,
			}}
		>
			<Stack spacing={2}>
				<Stack direction="row" spacing={2}>
					<img width="300" src={imageUrl} />
					<Stack spacing={2} textAlign={'left'}>
						<Typography variant="h5" gutterBottom>{movie.title}</Typography>
						<Stack direction="row" spacing={2}>
							<Stack sx={{ textAlign: 'center'}} spacing={2} direction="row">
								<PercentageCircular value={movie.vote_average*10} />
								<Stack>
									<Typography variant='default'>User</Typography>
									<Typography variant='default'>Vote</Typography>
								</Stack>
							</Stack>
						</Stack>
						<Typography variant="h6">Overview</Typography>
						<Typography>{movie.overview}</Typography>
						<Box>
							<IconButton aria-label="add to favorites" onClick={()=>onToggleFav(movie)}>
								<FavoriteIcon sx={{color: isFav? '#98002e' : ''}}/>
							</IconButton>
						</Box>
						<Box>
							<Typography variant="h6">Now Streaming</Typography>
							{movie.providers && movie.providers.map((provider) => <Provider providerLogo={provider.logo_path} key={provider.provider_id} />)}
						</Box>
					</Stack>
				</Stack>
			</Stack>
		</Box>
	);
}