
import { Route, Routes } from 'react-router-dom'
import Home2 from './Components/Home2.jsx'

import Trending from './Components/Trending.jsx'
import Popular from './Components/Popular.jsx'
import Movie from './Components/Movie.jsx'
import TvShows from './Components/TvShows.jsx'
import People from './Components/People.jsx'
import MovieDetails from './Components/MovieDetails.jsx'
import TvDetails from './Components/TvDetails.jsx'
import PersonDetails from './Components/PersonDetails.jsx'
import GenreFilterUI from './Components/NewRoutes/GenreFilterUI.jsx'
import DummyUnderrated from './Components/NewRoutes/DummyUnderrated.jsx'
import DummyClassic from './Components/NewRoutes/DummyClassic.jsx'
import TVGenre from './Components/NewRoutes/TVGenre.jsx'
import Documents from './Components/NewRoutes/Documents.jsx'
import SeasonDetails from './Components/NewRoutes/SeasonDetails.jsx'
import Video from './Components/Video.jsx'
import AboutUs from './Components/partials/AboutUs.jsx'
import LeftSideBar from './Components/partials/LeftSideBar.jsx'
import ContactUs from './Components/partials/ContactUs.jsx'
import { useState } from 'react'


export default function App() {
    const [wallpaper, setwallpaper] = useState(null)
  return (
      <div className={`w-full   flex`}>
   <LeftSideBar/>
        <Routes>
   
          <Route  path='/' element={<Home2 wallpaper={wallpaper} setWallpaper={setwallpaper}/>}/>
            
            <Route path='/trending' element={<Trending />} />

             <Route path='/popular' element={<Popular/>} />
             
             <Route path='/movie' element={<Movie/>} />

             <Route path='/movie/details/:id' element={<MovieDetails />} >

               <Route path='/movie/details/:id/trailer' element={<Video/>}/>
                 

               </Route>

{/* 
               <Route path='/movie/details/:id' element={<MovieDetails />}>
  <Route path='trailer' element={<Video />} />
</Route> */}


             <Route path='/tv' element={<TvShows/>} />

              <Route path='/tv/details/:id' element={<TvDetails />} >

              <Route path='/tv/details/:id/trailer' element={<Video/>}/>

              </Route>

              <Route path="/tv/:id/season/:season_number" element={<SeasonDetails/>}>  
                  <Route path="/tv/:id/season/:season_number/trailer" element={<Video />} />
                  </Route>

               <Route path='/people' element={ <People/>} />

                <Route path='/person/details/:id' element={<PersonDetails />} />

                <Route path="/movie-genre" element={<GenreFilterUI/>} />
                 <Route path="/under-rated-movies" element={<DummyUnderrated/>} />
                 <Route path="/classic-movies" element={  <DummyClassic/>} />
                 <Route path="/tv-genre" element={<TVGenre/>} />
                 <Route path="/documentaries" element= { <Documents/>} /> 
                  <Route path="/aboutus" element={<AboutUs />} />
                  <Route path="/contact" element={<ContactUs/>} />

        </Routes>
         </div>
  )
}


