import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../utils/Axios'
import altpic from '/picture.png'
 

export default function Navbar() {
  const [query, setquery] = useState(""); 
  const [searches, setsearches] = useState([]); // loading data

  const getSearches = async () => {
    try {
   
      const { data } = await axios.get(`/search/multi?query=${query}`);   
      setsearches(data.results)
    } catch (err) {
      console.log("error is valid", err);
    }
  }

  useEffect(() => {
  if(query) getSearches()
  
}, [query])

 

  return(
     
 <div className="  md:w-[50%] sm:w-[40%] w-full text-white flex items-center justify-center  sm:px-6 md:px-10   relative  ">
    
      <div className="relative flex items-center w-full   ">
        <i className="ri-search-line absolute left-3 text-gray-400 text-lg"></i>
        <input
          type="text"
          placeholder="Search anything..."
    
           className="w-full pl-10 pr-10 py-2 rounded-lg  bg-transparent text-sm sm:text-base focus:outline-none  focus:ring-2 focus:ring-red-500  "
          value={query}
          onChange={(e) => setquery(e.target.value)}
        />
        {query && (
          <i
            className="ri-close-fill absolute right-3 cursor-pointer text-gray-400 hover:text-white text-xl"
            onClick={() => setquery("")}
          ></i>
        )}

 
        {query && (
          <div className="absolute top-12 left-0 w-full max-h-[60vh] overflow-y-auto bg-gray-900 rounded-lg shadow-lg z-50">
            {searches.length > 0 ? (
              searches.map((item, index) => (
                <Link
                  to={`/${item.media_type}/details/${item.id}`}
                  key={index}
                  className="flex items-center gap-3 p-2 hover:bg-gray-800 transition"
                >
                  <img
                    src={
                      item.backdrop_path || item.profile_path
                        ? `https://image.tmdb.org/t/p/original/${item.backdrop_path || item.profile_path
                          }`
                        : altpic
                    }
                    alt={`${item.media_type}_${item.id}`}
                    className="w-15 h-[90px] object-cover rounded"
                  />
                  <span className="text-sm sm:text-base">
                    { item.title ||
                      item.original_title ||
                      item.name ||
                      item.original_name}
                  </span>
                </Link>
              ))
            ) : (
              <p className="p-3 text-gray-400 text-sm">No results found...</p>
            )}
          </div>
        )}
      </div>
    </div>



  )
}



// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import axios from '../../utils/Axios'
// import altpic from '/picture.png'

// export default function Navbar() {
//   const [query, setquery] = useState(""); 
//   const [searches, setsearches] = useState([]); 
//   const [isFixed, setIsFixed] = useState(false); // New state for fixed navbar

//   const getSearches = async () => {
//     try {
//       const { data } = await axios.get(`/search/multi?query=${query}`);   
//       setsearches(data.results)
//     } catch (err) {
//       console.log("error is valid", err);
//     }
//   }

//   useEffect(() => {
//     if(query) getSearches()
//   }, [query])

//   // Scroll listener to toggle fixed navbar
//   useEffect(() => {
//     const handleScroll = () => {
//       if(window.scrollY > 80) {  // adjust scroll threshold as needed
//         setIsFixed(true)
//       } else {
//         setIsFixed(false)
//       }
//     }
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   return(
// <div
//   className={`w-full fixed top-4 left-0 z-50 flex justify-center transition-all duration-300`}
// >
//   <div className="md:w-[50%] sm:w-[40%] w-full px-4">
//     <div className="relative flex items-center w-full">
//       <i className="ri-search-line absolute left-3 text-gray-400 text-lg"></i>
//       <input
//         type="text"
//         placeholder="Search anything..."
//         className="w-full pl-10 pr-10 py-2 rounded-lg bg-transparent text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-500"
//         value={query}
//         onChange={(e) => setquery(e.target.value)}
//       />
//       {query && (
//         <i
//           className="ri-close-fill absolute right-3 cursor-pointer text-gray-400 hover:text-white text-xl"
//           onClick={() => setquery("")}
//         ></i>
//       )}
//       {query && (
//         <div className="absolute top-12 left-0 w-full max-h-[60vh] overflow-y-auto bg-gray-900 rounded-lg shadow-lg z-50">
//           {searches.length > 0 ? (
//             searches.map((item, index) => (
//               <Link
//                 to={`/${item.media_type}/details/${item.id}`}
//                 key={index}
//                 className="flex items-center gap-3 p-2 hover:bg-gray-800 transition"
//               >
//                 <img
//                   src={
//                     item.backdrop_path || item.profile_path
//                       ? `https://image.tmdb.org/t/p/original/${item.backdrop_path || item.profile_path}`
//                       : altpic
//                   }
//                   alt={`${item.media_type}_${item.id}`}
//                   className="w-15 h-[90px] object-cover rounded"
//                 />
//                 <span className="text-sm sm:text-base">
//                   {item.title || item.original_title || item.name || item.original_name}
//                 </span>
//               </Link>
//             ))
//           ) : (
//             <p className="p-3 text-gray-400 text-sm">No results found...</p>
//           )}
//         </div>
//       )}
//     </div>
//   </div>
// </div>

//   )
// }
