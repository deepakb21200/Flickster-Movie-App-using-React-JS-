import React, { useEffect, useState } from 'react'
import axios from '../../utils/Axios';
import { useNavigate } from 'react-router-dom'
import Cards from '../partials/Cards';
import Loading from '../Loading';
import Dropdown from '../partials/Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Navbar from '../partials/Navbar';
import Search from '../Search';

 
export default function DummyClassic() {
      const [category, setcategory] = useState("movie")
      const [movies, setMovies] = useState([])
      const [page, setpage] = useState(1)
      const [hasMore, sethasMore] = useState(true)
      const [error, setError] = useState(""); 
      const [language, setLanguage] = useState("hi");  
      const Navigate = useNavigate()
 
 document.title = "Flickster | Classic Movies"

  const FetchClassic = async (currentPage= page) => {
    try {
 
      const { data } = await axios.get(`/discover/${category}?with_original_language=${language}&first_air_date.lte=2000-01-01&sort_by=vote_average.desc&page=${currentPage}`);

 

      if (data.results.length > 0) {
        setMovies((prev) => [
          ...prev,
          ...data.results.map((item) => ({ ...item, media_type: category })),
        ])

        setpage((prev) => prev + 1)

      } else {
        sethasMore(false)
      }
    } catch (err) {
 
      sethasMore(false); 
       setError(true);  
    }
  };
 
  const refreshHandler = () => {
    if(movies.length == 0){
  FetchClassic()
}
  else{
          setpage(1)
          setMovies([]);
           sethasMore(true)
          FetchClassic(1)
         
        }

  };

  useEffect(() => {
    refreshHandler();
  }, [category, language]);
 


 return movies.length> 0 ?  (
      <div className=' xl:px-[30px]'>
     
        <div className='w-full   flex items-center   justify-center my-[5px]   flex-wrap  p-[10px]  '>
          <h1 className='text-2xl font-semibold text-zinc-400   px-[30px]'>
          <i onClick={()=>Navigate(-1)} className="ri-arrow-left-line p-3 text-2xl hover:text-[#DD4343] 
          cursor-pointer "></i>
              Classic Movies <small className='ml-1 text-lg text-zinc-500'>({category} , {language})</small>  
          </h1>
               <Navbar/>
          <div className='flex justify-between  items-center'>
            <div className='flex '>
            <Dropdown title="Category" options={["movie", "tv"]} func={(e) => setcategory(e.target.value)}  value={category}/>
              <Dropdown title="Language" options={["hi", "en"]} func={(e) => setLanguage(e.target.value)}  value={language}/>
            </div>
       

          </div>
        </div>

                 <InfiniteScroll
             dataLength={movies.length}
        style={{overflow:"visible"}}
            next={FetchClassic} 
            hasMore={hasMore && !error}   // error aaya to aur data fetch mat karo
          loader={!error && <Search /> } >
            
         <Cards data={movies} title="movies" />
       
         </InfiniteScroll>

          {error && (
  <p className="flex items-center justify-center gap-2 text-red-500 text-lg font-semibold ">
    <i className="ri-error-warning-line text-5xl "></i>
    Something went wrong, please try again!
  </p>
)}
      </div>
    ) : <Loading />

}
 