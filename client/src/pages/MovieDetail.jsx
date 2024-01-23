//movie detial information here
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_MOVIEDETAIL } from '../utils/queries';
import LoadingButton from '@mui/lab/LoadingButton';

export default function MovieDetail(movieId) {
	//get movie data by GraphQL
	const { movieId } = useParams();
	
	const { loading, data } = useQuery(QUERY_MOVIEDETAIL, {
		variables: {movieId: movieId}
	});
	
	const movie = data?.movie || {};
	
	if (loading) {
		<LoadingButton loading>
    	</LoadingButton>
	}

	const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

	//return a temp output, will edit it later
	return (
		<div>
			<h1>{movie.title}</h1>
			<image src={imageUrl} />
		</div>
	);
};