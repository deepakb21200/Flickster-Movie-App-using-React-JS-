import React, { useState, useEffect } from "react";
import axios from '../../utils/Axios';  
import Cards from "../partials/Cards";
import Loading from "../Loading";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from "react-router-dom";
import Navbar from "../partials/Navbar";
import Dropdown from "../partials/Dropdown";
import Search from '../Search';
export default function Documents() {
  const [category, setCategory] = useState("movie");  
  const [language, setLanguage] = useState("hi");  
  const [documentaries, setDocumentaries] = useState([]);
  const [page, setpage] = useState(1)
   const [hasMore, sethasMore] = useState(true)
    const [error, setError] = useState(""); 
    const Navigate = useNavigate()
   document.title = "Flickster | Documentaries"

 const fetchDocumentaries = async (currentPage = page) => {
    try {
 
      const { data } = await axios.get(`/discover/${category}?with_genres=99&with_original_language=${language}&sort_by=popularity.desc&page=${currentPage}`);

 
      if (data.results.length > 0) {
        setDocumentaries((prev) => [...prev, ...data.results.map(item => ({ ...item, media_type: category }))])
        setpage((prev) => prev + 1)
      } else {
        sethasMore(false);
      }

    } catch (err){
      sethasMore(false); 
       setError(true);  
    }
  };

  const refreshHandler = () => {
    if(documentaries.length == 0){
         fetchDocumentaries()
}
  else{
          setpage(1)
         setDocumentaries([]);
         sethasMore(true);
         fetchDocumentaries(1)       
        }

  };

  useEffect(() => {
    refreshHandler();
  }, [category, language]);

  

 return documentaries.length > 0 ?  (
      <div className='w-screen xl:px-[30px]'>
     
        <div className='w-full flex items-center  justify-between my-[5px]   flex-wrap  pl-[30px] xl:pl-[0px]'>
          <h1 className='text-2xl font-semibold text-zinc-400  '>
          <i onClick={()=>Navigate(-1)} className="ri-arrow-left-line p-3 text-2xl hover:text-[#DD4343] cursor-pointer"></i>
            Documentaries <small className='ml-1 text-sm text-zinc-500'>({category} {language})</small> 
          </h1>
               <Navbar/>
          <div className='flex justify-between   items-center'>
        
            <div className='flex '>
            <Dropdown title="Category" options={["movie", "tv"]} func={(e) => setCategory(e.target.value)} 
             value={category}  />
            <Dropdown title="Language" options={["hi", "en"]} func={(e) => setLanguage(e.target.value)} 
          value={language}  />
            </div>
          

          </div>
        </div>

              <InfiniteScroll
             dataLength={documentaries.length}
           next={fetchDocumentaries}
            style={{overflow:"visible"}}
           hasMore={hasMore && !error}   // error aaya to aur data fetch mat karo
           loader={!error && <Search />}
       >
           <Cards data={documentaries} title={category}/>
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
 