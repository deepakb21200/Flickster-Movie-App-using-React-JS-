import React, { useEffect, useState } from 'react'
import Loading from './Loading'
import axios from '../utils/Axios';
import Navbar from './partials/Navbar'
import Dropdown from './partials/Dropdown'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import Cards from './partials/Cards';
import Search from './Search';

function TvShows() {
  const [category, setcategory] = useState("airing_today")
  const [tvshows, settvshows] = useState([])
  const [page, setpage] = useState(1)
  const [hasMore, sethasMore] = useState(true)
  const [error, setError] = useState(""); 
  document.title = "Flickster | TV Shows"
  const Navigate = useNavigate()
 

    const GetTvShows = async (currentPage=page) => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${currentPage}`);

      if (data.results.length > 0) {
        settvshows((prev) => [...prev, ...data.results]);
        setpage((prev) => prev + 1);
      } else {
        sethasMore(false);
      }
    } catch (err) {
      sethasMore(false); 
       setError(true);  
    }
  };

  const refreshHandler = () => {
if(tvshows.length == 0){
   GetTvShows()
}
  else{
        setpage(1)
        settvshows([]);
        sethasMore(true)
        GetTvShows(1)
 
        }

  };

  useEffect(() => {
    refreshHandler();
  }, [category]);


 return tvshows.length > 0 ?  (
      <div className='w-screen xl:px-[30px]      '>
     
        <div className='w-full flex items-center  justify-between my-[5px]   flex-wrap  pl-[30px] xl:pl-[0px]'>
          <h1 className='text-2xl font-semibold text-zinc-400  '>
          <i onClick={()=>Navigate(-1)} className="ri-arrow-left-line p-3 text-2xl hover:text-[#DD4343]  "></i>
            TV Shows <small className='ml-1 text-sm text-zinc-500'>({category}  )</small> 
          </h1>
               <Navbar/>
          <div className='flex justify-between   items-center'>
            <div className='flex '>
            <Dropdown title="Category" options={["on_the_air", "top_rated", "airing_today", "popular"]} func={(e) => setcategory(e.target.value)} 
            value={category} />
            </div>
          

          </div>
        </div>

        <InfiniteScroll
          dataLength={tvshows.length}
            next={GetTvShows}
             hasMore={hasMore && !error}   // error aaya to aur data fetch mat karo
         loader={!error && <Search />}
          className='w-full'
            style={{overflow:"visible"}}
            
        >
          <Cards data={tvshows} title="tv" />
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

export default TvShows
