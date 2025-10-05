import React, { useEffect, useState } from 'react'
 import Navbar from './partials/Navbar';
import Header from './partials/Header';
import HorizCards from './partials/HorizCards';
import axios from '../utils/Axios'
import Loading from './Loading';
import LeftSideBar from './partials/LeftSideBar';
 
function Home() {
  document.title = "Flickster"  
  let [AllData,SetAllData] =useState({
      trending:[],                                  
      moviesGenre:[],
      TvGenre:[],
      Documentary:[],
      underRatedMovies:[],
      classicMovies:[]
    })


  
  const [wallpaper, setwallpaper] = useState(null)
 


 
const GetHeaderwallpaper = async () => {
    try {
 
      const [data1,
        moviegenre,Tvgenre,
          doc_movie,doc_tv,
        underMovieUrl,underTvUrl,
         classicMovies, classicTVs] = await Promise.all([
          axios.get(`/trending/all/day`),//trending
          axios.get(`/discover/movie?with_genres=28`), //movie genre type = action 
          axios.get( `/discover/tv?with_genres=10759`), //tv genre type = action & classic ek hota hi tv me 
           axios.get(`/discover/movie?with_genres=99&with_original_language=hi&sort_by=popularity.desc`), //doc movies
          axios.get(`/discover/tv?with_genres=99&with_original_language=hi&sort_by=popularity.desc`), //doc tv
          axios.get(`/discover/movie?sort_by=vote_average.desc&vote_count.gte=10&vote_average.lte=7&with_original_language=hi`), //underMovieUrl
          axios.get(`/discover/tv?sort_by=vote_average.desc&vote_count.gte=10&vote_average.lte=7&with_original_language=hi`),//underTvUrl
         axios.get(`/discover/movie?region=IN&with_original_language=hi&primary_release_date.lte=2000-01-01&sort_by=vote_average.desc`),//classicMovies
          axios.get(`/discover/movie?with_original_language=en&primary_release_date.lte=2000-01-01&sort_by=vote_average.desc`)//classicTVs
     
        ]);

SetAllData(prev => ({
  ...prev,
   trending: data1.data.results,

  moviesGenre: moviegenre.data.results.map(item => ({ ...item, media_type: "movie" })),

  TvGenre: Tvgenre.data.results.map(item => ({ ...item, media_type: "tv" })),

  Documentary: [
    ...doc_movie.data.results.map(item => ({ ...item, media_type: "movie" })),
    ...doc_tv.data.results.map(item => ({ ...item, media_type: "tv" }))
  ],

  underRatedMovies: [
    ...underMovieUrl.data.results.map(item => ({ ...item, media_type: "movie" })),
    ...underTvUrl.data.results.map(item => ({ ...item, media_type: "tv" }))
  ],

  classicMovies: [
    ...classicMovies.data.results.map(item => ({ ...item, media_type: "movie" })),
    ...classicTVs.data.results.map(item => ({ ...item, media_type: "tv" }))
  ]
}));




 const randomIndex = Math.floor(Math.random() * data1.data.results.length);
          setwallpaper(data1.data.results[randomIndex]);   
    }
    catch (err) {
      console.log(err);

    }
  }
 




    useEffect(() => {
     GetHeaderwallpaper()
    }, [])
 

  return (wallpaper) ? (
    <>
    {/* <LeftSideBar/> */}
  <div className='w-full h-screen overflow-auto'
         style={{
    // scrollbarWidth: "none",  
msOverflowStyle: "none",  
  }}>
          <div className='  flex justify-center'>
            <Navbar/>
          </div>
          <Header data={wallpaper}/>
 
 
<HorizCards data={AllData.trending} title="Trending Now"  viewMoreRoute="/trending"/>
<HorizCards data={AllData.moviesGenre} title="Movies by Genre"  viewMoreRoute="/movie-genre"/>  
<HorizCards data={AllData.underRatedMovies} title="Underrated Picks"  viewMoreRoute="/under-rated-movies"/> 
<HorizCards data={AllData.classicMovies} title="All-Time Classics"  viewMoreRoute="/classic-movies"/>  
<HorizCards data={AllData.TvGenre} title="TV Shows by Genre"  viewMoreRoute="/tv-genre"/>  
<HorizCards data={AllData.Documentary} title="Documentary Highlights"  viewMoreRoute="/documentaries"/>
         </div>
        
    </>

  ): 
    <Loading/>
 
}

export default Home