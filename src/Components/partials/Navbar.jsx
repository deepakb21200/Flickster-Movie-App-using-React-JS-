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
     <div className="relative w-full sm:w-[70%] md:w-[50%] mx-auto text-white px-3 sm:px-6">
  <div className="relative group">
    {/* Search Input */}
    <div className="flex items-center bg-[#1a1a1a]



 backdrop-blur-xl border border-[#2a2c38] rounded-2xl px-4 py-3 shadow-lg transition-all duration-300 hover:shadow-[0_0_15px_#6556CD40] focus-within:border-[red]">
      <i className="ri-search-line text-gray-400 text-xl mr-3 group-focus-within:text-[red] transition-colors duration-300"></i>

      <input
        type="text"
        placeholder="Search movies, shows, or people..."
        className="flex-1 bg-transparent text-white placeholder-gray-400 text-sm sm:text-base outline-none"
        value={query}
        onChange={(e) => setquery(e.target.value)}
      />

      {query && (
        <i
          className="ri-close-fill text-gray-400 hover:text-[#6556CD] text-2xl cursor-pointer transition-all duration-300"
          onClick={() => setquery("")}
        ></i>
      )}
    </div>

    {/* Dropdown */}
    {query && (
      <div className="absolute top-[110%] left-0 w-full max-h-[65vh] overflow-y-auto bg-[#0f1117]/95 backdrop-blur-xl border border-[#2a2c38] rounded-2xl shadow-2xl mt-3 z-50 animate-fadeIn">
        {searches.length > 0 ? (
          searches.map((item, index) => (
            <Link
              to={`/${item.media_type}/details/${item.id}`}
              key={index}
              className="flex items-center gap-4 p-3 sm:p-4 hover:bg-[#1a1d2a] transition-all duration-200 rounded-xl"
            >
              <img
                src={
                  item.backdrop_path || item.profile_path
                    ? `https://image.tmdb.org/t/p/original${item.backdrop_path || item.profile_path}`
                    : altpic
                }
                alt={`${item.media_type}_${item.id}`}
                className="w-[65px] h-[65px] sm:w-[85px] sm:h-[85px] object-cover rounded-lg shadow-md flex-shrink-0"
              />
              <div className="flex flex-col">
                <span className="text-base font-semibold text-white line-clamp-1">
                  {item.title ||
                    item.original_title ||
                    item.name ||
                    item.original_name}
                </span>
                <span className="text-xs text-gray-400 capitalize">
                  {item.media_type}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <p className="p-4 text-gray-400 text-center text-sm">
            No results found...
          </p>
        )}
      </div>
    )}
  </div>
</div>




  )
}

