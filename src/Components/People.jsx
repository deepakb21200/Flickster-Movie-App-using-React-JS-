
import React, { useEffect, useState } from 'react'
 
import { useNavigate } from 'react-router-dom'
import axios from '../utils/Axios';
 
 
import InfiniteScroll from 'react-infinite-scroll-component';
import Navbar from './partials/Navbar';
import Loading from './Loading';
import Cards from './partials/Cards';
import Search from './Search';

function People() {
    const navigate = useNavigate();
    const [people, setpeople] = useState([]);
    const [page, setpage] = useState(1)
    const [hasmore, sethasmore] = useState(true)
  
        const [error, setError] = useState(""); 
    document.title = "Flickster | People" 
  
    const Getpeople = async (currentPage = page) => {
      try {
       const { data } = await axios.get(`/person/popular?page=${currentPage}`)
        
        if(data.results.length > 0){
          console.log(data.results);
          
          setpeople((prev)=>[...prev, ...data.results]);
          setpage((prev)=> prev + 1 )
        }
        else{
          sethasmore(false)
        }
      }
      catch (err) {
 
      sethasmore(false); 
       setError(true);  
      }
    }


     useEffect(() => {
       Getpeople()
    },[])
 
 return people.length > 0 ?  (
      <div className=' xl:px-[30px]'>
     
        <div className='w-full   flex items-center   justify-center my-[5px]   flex-wrap  p-[10px]  '>
          <h1 className='text-2xl font-semibold text-zinc-400   px-[30px]'>
          <i onClick={()=>navigate(-1)} className="ri-arrow-left-line p-3 text-2xl hover:text-[#DD4343] 
          cursor-pointer "></i>
              People 
          </h1>
               <Navbar/>
       
        </div>

    <InfiniteScroll
          dataLength={people.length}
            next={Getpeople}
        hasMore={hasmore && !error}   // error aaya to aur data fetch mat karo
        loader={!error && <Search />}
          className='w-full'>
          <Cards data={people} title="person" />
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

export default People