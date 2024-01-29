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
	//get movie data by GraphQL
	const { movieId } = useParams();
	const { loading, error, data } = useQuery(QUERY_MOVIEDETAIL, {
		variables: {movieId: movieId}
	});
	
	const movie = data?.movie || {};

	const { isFav, addFavoriteMovie, removeFavoriteMovie } = useFavoriteMovies();
	const [favBtnColor, setfavBtnColor] = useState(isFav(movie.id) ? '#98002e' : '');

	useEffect(() => {
		if (data) {
			setfavBtnColor(isFav(data.movie.id) ? '#98002e' : '');
		}
	}, [data, isFav]);
	
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

	const toggleFav = async () => {
		if (Auth.loggedIn()) {
			if (isFav(movie.id)) {
				console.log("remove")
				const success = await removeFavoriteMovie(movie.id);
				if (success) setfavBtnColor('');
			} else {
				console.log("add")
				const success = await addFavoriteMovie(movie.id);
				if (success) setfavBtnColor('#98002e');
			}
		} else {
			alert("Login first.");
		}
		
	};

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
							<IconButton aria-label="add to favorites" onClick={toggleFav}>
								<FavoriteIcon sx={{color:favBtnColor}}/>
							</IconButton>
						</Box>
						<Box>
							<Typography variant="h6">Now Streaming at</Typography>
							{movie.providers.map((provider) => <Provider providerLogo={provider.logo_path} key={provider.provider_id} />)}
						</Box>
					</Stack>
				</Stack>
			</Stack>
		</Box>
	);
}