import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import Cards from './partials/Cards';
import axios from '../utils/Axios';
import Navbar from './partials/Navbar';
import Dropdown from './partials/Dropdown';
import Loading from './Loading';
import Search from './Search';

export default function Movie() {
  const [category, setcategory] = useState("now_playing")
  const [movie, setmovie] = useState([])
  const [page, setpage] = useState(1)
  const [hasMore, sethasMore] = useState(true)
    const [error, setError] = useState(""); 

  document.title = "Flickster | Movie"
  const Navigate = useNavigate()
 
const GetMovie = async (currentPage = page) => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${currentPage}`);

      if (data.results.length > 0) {
        setmovie((prev) => [...prev, ...data.results]);
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
  if(movie.length == 0){
    GetMovie()
}
  else{
          setpage(1)
          setmovie([])
          sethasMore(true);
          GetMovie(1)
          
        }

  };

  useEffect(() => {
    refreshHandler();
  }, [category]);


 return movie.length > 0 ?  (
      <div className='w-full xl:px-[30px]'>
     
        <div className='w-full flex items-center  justify-between my-[10px]   flex-wrap  pl-[30px] xl:pl-[0px]'>
          <h1 className='text-2xl font-semibold text-zinc-400  '>
          <i onClick={()=>Navigate(-1)} className="ri-arrow-left-line p-3 text-2xl hover:text-[#DD4343]  "></i>
            Movies<small className='ml-1 text-sm text-zinc-500'>({category} )</small> 
          </h1>
               <Navbar/>
          <div className='flex justify-between   items-center'>           
            <div className='flex '>
    <Dropdown title="Category" options={["popular", "top_rated", "upcoming", "now_playing"]} func={(e) => setcategory(e.target.value)} category={category}
               value={category} />
            </div>
          

          </div>
        </div>

        <InfiniteScroll
          dataLength={movie.length}
            next={GetMovie}
           hasMore={hasMore && !error}   // error aaya to aur data fetch mat karo
         loader={!error && <Search />}
//    loader={!error && (
//   <div className="h-16 flex items-center justify-center">
//     <p className="text-zinc-400 text-lg">Loading movies...</p>
//   </div>
// )}
          className='w-full'
            style={{overflow:"visible"}}
             scrollThreshold={1} 
            
        >
         <Cards data={movie} title="movie" />
        </InfiniteScroll>



            {error && (
  <p className="flex items-center justify-center gap-2 text-red-500 text-lg font-semibold ">
    <i className="ri-error-warning-line text-5xl "></i>
    Something went wrong, please try again!
  </p>
)}
      </div>
    ) : <Loading />






























    






















// px-[3%] xl:px-[30px]
    // return movie.length > 0 ? (
    //     <div className=' px-[3%] xl:px-[30px]'>
    //       <div className='w-full flex items-center justify-between'>
    //         <h1 className='text-2xl font-semibold text-zinc-400'>
    //           <i onClick={() => Navigate(-1)} className='hover:text-[#6556CD] ri-arrow-left-line p-3'></i>
    //           movie <small className='ml-1 text-sm text-zinc-500'>({category})  </small></h1>
    
    //         <div className='flex items-center w-[80%]'>
    
    //      <Navbar/>
    
    //           <Dropdown title="Category" options={["popular", "top_rated", "upcoming", "now_playing"]} func={(e) => setcategory(e.target.value)} />
    //           <div className='w-[2%]'></div>
    
    //         </div>
    //       </div>
    //       <div className='m-auto w-screen'>
    
    //         <InfiniteScroll
    //           dataLength={movie.length}
    //           next={GetMovie}
    //           hasMore={hasMore}
    //           className='w-full'
    //           style={{overflowX:"hidden"}}
    //           loader={<h4>Loading...</h4>}
    //           >
    //           <Cards data={movie} title="movie" />
    //         </InfiniteScroll>
    
    //       </div>
    
    //     </div>
    //   ) : <Loading />








}
