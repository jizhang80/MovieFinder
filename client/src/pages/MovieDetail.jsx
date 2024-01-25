//movie detial information here
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_MOVIEDETAIL } from '../utils/queries';

export default function MovieDetail() {
	//get movie data by GraphQL
	const { movieId } = useParams();
	const { loading, error, data } = useQuery(QUERY_MOVIEDETAIL, {
		variables: {movieId: movieId}
	});
	
	const movie = data?.movie || {};
	console.log(movie)
	
	if (loading) {
		<p>Loading...</p>
	}

	if (error) console.log(JSON.stringify(error, null, 2));

	const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

	//return a temp output, will edit it later
	return (
		<div>
			<h1>{movie.title}</h1>
			<img src={imageUrl} />
		</div>
	);
};