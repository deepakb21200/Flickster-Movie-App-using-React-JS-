 
import React, { useEffect, useState } from "react";
import axios from '../../utils/Axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import Cards from "../partials/Cards";
import Loading from "../Loading";
import Search from "../Search";

export default function TVGenre() {


    const [genrelist, setGenrelist] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [moviesArr, setMoviesArr] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
     const [error, setError] = useState(false); 
document.title = "Flickster | Tv by Genre" 
  const Navigate = useNavigate();

  // Fetch genres from TMDB API
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const { data } = await axios.get(`/genre/tv/list`);
         
        setGenrelist(data.genres);
      } catch (err) {
        console.log("Error fetching genres:", err.message);
      }
    };

    fetchGenres();
  }, []);


  const fetchMovies = async (genreId, currentPage = page) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/discover/tv?with_genres=${genreId}&page=${currentPage}`);

      if (data.results.length > 0) {
        setMoviesArr(prev => [...prev, ...data.results]);
        setPage(prev => prev + 1);
      } else {
        setHasMore(false);
      }
      setLoading(false);  
    } catch (err) {
      console.log("Error fetching shows:", err.message);
       setHasMore(false)
      setLoading(false);  
        setError(true);  
        
    }
  };


   const onGenreClick = (genre) => {
    if (selectedGenre?.id === genre.id) return; 
    setHasMore(true);
    setSelectedGenre(genre);
    setMoviesArr([]);
    setPage(1);
    setHasMore(true);
    fetchMovies(genre.id, 1);
  };


if(genrelist.length == 0){
  return <Loading/>
}



 return (


      <div className="w-full   flex items-center   justify-center my-[5px]   flex-wrap  px-[30px] py-[10px]"> 
      
      <div className="flex flex-wrap items-center gap-3 py-2 px-2">
       {genrelist.length > 0 && (
  <>
    <i
      onClick={() => Navigate(-1)}
      className="ri-arrow-left-line p-3 text-2xl hover:text-[#DD4343] text-zinc-400
      cursor-pointer"
    ></i>

    {genrelist.map((genre) => (
      <button
        key={genre.id}
        className={`flex-shrink-0 px-5 py-2 rounded-full font-semibold text-sm transition-all whitespace-nowrap border-none
          ${selectedGenre?.id === genre.id
            ? 'bg-red-500 text-white shadow-md'
            : 'bg-gray-200 text-gray-800 hover:bg-red-500 hover:text-white hover:shadow-sm'
          }`}
        onClick={() => onGenreClick(genre)}
      >
        {genre.name}
      </button>
    ))}
  </>
)  }

      </div>

 
      {loading && moviesArr.length === 0 && (
    
        <Search/>
      )}

 


      {/* Movie list */}
      {moviesArr.length > 0 && (
        <InfiniteScroll
          dataLength={moviesArr.length}
          next={() => fetchMovies(selectedGenre?.id, page)}
           hasMore={hasMore && !error}   // error aaya to aur data fetch mat karo
           loader={!error && <Search />}  >
          <Cards data={moviesArr} title="tv" />
        </InfiniteScroll>
      )}
         
  

      {error && (
  <p className="flex items-center justify-center gap-2 text-red-500 text-lg font-semibold ">
    <i className="ri-error-warning-line text-5xl "></i>
    Something went wrong, please try again!
  </p>
)}
    </div>
  );
}
