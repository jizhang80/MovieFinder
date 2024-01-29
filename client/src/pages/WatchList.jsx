import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import {QUERY_FAV_MOVIES_DETAIL} from '../utils/queries';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import Typography from '@mui/material/Typography';
import Auth from '../utils/auth';
import MovieCard from '../components/MovieCard';


const WatchList = () => {
  //get user fav movies
  if (Auth.loggedIn()) {
    const { data, loading, error } = useQuery(QUERY_FAV_MOVIES_DETAIL); 
    if (error) console.log(JSON.stringify(error, null, 2));
    const movies = data?.favMoviesDetail||{};

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
  } else {
    return (
      //please login
      <Typography>Please login first</Typography>
      );
  }
}

export default WatchList;
