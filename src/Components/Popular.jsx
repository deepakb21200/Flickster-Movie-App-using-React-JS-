  import React, { useEffect, useState } from 'react'
  import axios from '../utils/Axios';
  import Navbar from './partials/Navbar'
  import Dropdown from './partials/Dropdown'
  import { useNavigate } from 'react-router-dom'
  import Cards from './partials/Cards';
  import InfiniteScroll from 'react-infinite-scroll-component';
  import Loading from './Loading';
import Search from './Search';

  export default function Popular() {
    let [category, setcategory] = useState("movie")
    let [popular, setpopular] = useState([])
    let [page, setpage] = useState(1)
    let [hasMore, sethasMore] = useState(true)
    let [error, setError] = useState(""); 
  document.title = "Flickster | Popular"
    let Navigate = useNavigate()

 
  let GetPopular = async (currentPage = page ) => {
    try {
      if (category === "all") {
        let [moviesResponse, tvResponse] = await Promise.all([
          axios.get(`/movie/popular?page=${currentPage}`),
          axios.get(`/tv/popular?page=${currentPage}`),
        ]);


        let combined = [
          ...moviesResponse.data.results.map((item) => ({ ...item, media_type: "movie" })),
          ...tvResponse.data.results.map((item) => ({ ...item, media_type: "tv" })),
        ];

        if (combined.length === 0) {
          sethasMore(false);
          return;  
          }

         setpopular((prev) => [...prev, ...combined]);
          setpage((prev) => prev + 1);

      } else {
        let { data } = await axios.get(`/${category}/popular?page=${currentPage}`);


        if (data.results.length > 0) {
          setpopular((prev) => [...prev, ...data.results]);
          setpage((prev) => prev + 1);
        } else {
          sethasMore(false);
        }
      }
    } catch (err) {
 
      sethasMore(false); 
       setError(true);  
    }
  };

  let refreshHandler = () => {
    if(popular.length == 0){
    GetPopular();
  }
  else{
          setpage(1)
          setpopular([]);
           sethasMore(true);
          GetPopular(1);
           
        }

  };

  useEffect(() => {
    refreshHandler();
  }, [category]);
  


 return popular.length > 0 ?  (
      <div className=' xl:px-[30px]'>
     
        <div className='w-full flex items-center  justify-between my-[5px]   flex-wrap  pl-[30px] xl:pl-[0px]deepak'>
    

          <h1 className='text-2xl font-semibold text-zinc-400  '>
          <i onClick={()=>Navigate(-1)} className="ri-arrow-left-line p-3 text-2xl hover:text-[#DD4343]  "></i>
           Popular <small className='ml-1 text-lg text-zinc-500'>{category}</small> 
          </h1>
               <Navbar/>
          <div className='flex justify-between items-center'> 
            <div className='flex '>
                 <Dropdown title="Category" options={["movie", "tv", "all"]} func={(e) => setcategory(e.target.value)} 
            value={category}  />
            </div>
          

          </div>
        </div>

        <InfiniteScroll
          dataLength={popular.length}
            next={GetPopular}
          hasMore={hasMore && !error}   // error aaya to aur data fetch mat karo
          // loader={!error && <Search />}
//              loader={!error && (
//   <div className="h-16 flex items-center justify-center">
//     <p className="text-zinc-400 text-lg">Loading movies...</p>
//   </div>
// )}

loader={<h4>Loading...</h4>}
          className='w-full'
            // style={{overflow:"visible"}}
            >
          <Cards data={popular} title= {category} />
        </InfiniteScroll>

          {error && (
  <p className="flex items-center justify-center gap-2 text-red-500 text-lg font-semibold ">
    <i className="ri-error-warning-line text-5xl "></i>
    Something went wrong, please try again!
  </p>
)}
      </div>
    ) : <Loading />






  //  return popular.length > 0 ? (
  //       <div className=' w-full xl:px-[30px]   '>
  //         <div className='w-full flex items-center justify-between'>
  //           <h1 className='text-2xl font-semibold text-zinc-400'>
  //             <i onClick={() => Navigate(-1)} className='hover:text-[#6556CD] ri-arrow-left-line p-3'></i>
  //             popular</h1>
    
  //           <div className='flex items-center w-[80%]'>
    
  //    <Navbar/>
    
  //             <Dropdown title="Category" options={["movie", "tv"]} func={(e) => setcategory(e.target.value)} />
      
    
  //           </div>
  //         </div>
  //         <div className='m-auto w-full'>
    
  //           <InfiniteScroll
  //             dataLength={popular.length}
  //             next={GetPopular}
  //             hasMore={hasMore}
  //             loader={<h4>Loading...</h4>}
  //             >
  //             <Cards data={popular} title={category} />
  //           </InfiniteScroll>
    
  //         </div>
    
  //       </div>
  //     ) : <Loading />

















  }


