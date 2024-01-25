// movie search result page
import React, {useState, useEffect} from 'react'
import MovieCard from '../components/MovieCard';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import { useParams } from 'react-router-dom';
import searchMovie from '../utils/searchMovies';

export default function MovieSearchResult() {
	const {keyword} = useParams();
	const [ movies, setMovies ] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const moviesArray = await searchMovie(keyword);
				setMovies(moviesArray);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching movie data:', error);
				setLoading(false);
			}
		}

		if (keyword) {
			fetchMovies();
		}
	}, [keyword]);

	return (
		<div className='aos-init aos-animate'>
			<div className="m-5" data-aos="fade-up" data-aos-delay="200">
				<ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 1200: 3}}>
					<Masonry>
						{loading ? (
							<p>Loading...</p>
						) : (
							movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)
						)}
					</Masonry>
				</ResponsiveMasonry>
			</div>
		</div>
	);
}