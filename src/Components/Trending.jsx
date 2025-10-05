import React, { useEffect, useState } from 'react'
import axios from '../utils/Axios';
import { useNavigate } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component';
import Dropdown from './partials/Dropdown';
import Navbar from './partials/Navbar';
import Cards from './partials/Cards';
import Loading from './Loading';
import Search from './Search';
 
export default function Trending() {
    let [category, setcategory] = useState("all")  
  let [duration, setduration] = useState("day") 
  let [trending, settrending] = useState([])
  let [page, setpage] = useState(1)
  let [hasMore, sethasMore] = useState(true)
     let [error, setError] = useState(""); 
  document.title = "Flickster | Trending"  
  let Navigate = useNavigate()
 

  let GetTrending = async (currentPage= page) => {
  try {
    let { data } = await axios.get(`/trending/${category}/${duration}?page=${currentPage}`);
 
    
    if (data.results.length > 0) {
      settrending((prev) => [...prev, ...data.results]);
      setpage((prev) => prev + 1);
    } else {
      sethasMore(false)
    }
  } catch (err) {
       sethasMore(false); 
       setError(true);  
  }
};

let refreshHandler = () => {
 
  // setpage(1);
  // settrending([]);
  // sethasMore(true);

 
  // GetTrending(1);
if(trending.length == 0){
  GetTrending()

  
}
 else {
  setpage(1);
  settrending([]);
  sethasMore(true);
  GetTrending(1);
}

};

useEffect(() => {
  refreshHandler();
}, [category, duration]);

 return trending.length > 0 ?  (
      <div className=' xl:px-[30px]'>
     
        <div className='w-full flex items-center  justify-between my-[5px]   flex-wrap  pl-[30px] xl:pl-[0px]'>
          <h1 className='text-2xl font-semibold text-zinc-400  '>
          <i onClick={()=>Navigate(-1)} className="ri-arrow-left-line p-3 text-2xl hover:text-[#DD4343] 
          cursor-pointer "></i>
             Trending  <small className='ml-1 text-sm text-zinc-500'>({category},{duration})</small> 
          </h1>
               <Navbar/>
          <div className='flex justify-between  items-center'>
            <div className='flex '>
               <Dropdown title="Category" options={["movie", "tv", "movie,tv,people"]} func={(e) => setcategory(e.target.value)}   value={category}   />

            <Dropdown title="Duration" options={["week", "day"]} func={(e) => setduration(e.target.value)} value={duration} />
            </div>
       

          </div>
        </div>

       <InfiniteScroll
         dataLength={trending.length}
        next={GetTrending}
          hasMore={hasMore && !error}   // error aaya to aur data fetch mat karo
 
          
         loader={!error && <Search />}
//           loader={!error && (
//   <div className="h-16 flex items-center justify-center">
//     <p className="text-zinc-400 text-lg">Loading movies...</p>
//   </div>
// )}
         
         >

      <Cards data={trending}  />
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
