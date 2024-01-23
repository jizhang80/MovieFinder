// movie search result page
import MovieCard from '../components/MovieCard';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";

export default function MovieSearchResult({movies}) {
	return (
		<div className='aos-init aos-animate'>
			<div className="m-5" data-aos="fade-up" data-aos-delay="200">
				<ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 1200: 3}}>
					<Masonry>
						{movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)}
					</Masonry>
				</ResponsiveMasonry>
			</div>
		</div>
	);
}