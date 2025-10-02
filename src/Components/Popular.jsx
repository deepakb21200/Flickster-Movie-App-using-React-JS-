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
    const [category, setcategory] = useState("movie")
    const [popular, setpopular] = useState([])
    const [page, setpage] = useState(1)
    const [hasMore, sethasMore] = useState(true)
 
    const [error, setError] = useState(""); 
  document.title = "Flickster | Popular"
    const Navigate = useNavigate()

 
  const GetPopular = async (currentPage = page ) => {
    try {
      if (category === "all") {
        const [moviesResponse, tvResponse] = await Promise.all([
          axios.get(`/movie/popular?page=${currentPage}`),
          axios.get(`/tv/popular?page=${currentPage}`),
        ]);


        const combined = [
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
        const { data } = await axios.get(`/${category}/popular?page=${currentPage}`);


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

  const refreshHandler = () => {
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
      <div className='w-screen xl:px-[30px]      '>
     
        <div className='w-full flex items-center  justify-between my-[5px]   flex-wrap  pl-[30px] xl:pl-[0px]'>
          <h1 className='text-2xl font-semibold text-zinc-400  '>
          <i onClick={()=>Navigate(-1)} className="ri-arrow-left-line p-3 text-2xl hover:text-[#DD4343]  "></i>
           Popular <small className='ml-1 text-sm text-zinc-500'>{category}</small> 
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
          loader={!error && <Search />}
          className='w-full'
            style={{overflow:"visible"}}>
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



  }


