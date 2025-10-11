import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa"; 
  import altpic from '/noimages.png'
import { Link } from "react-router-dom";

export default function HorizCards({ data ,title,viewMoreRoute, original}) {

  
  const initialLimit = 20;
  const limitedData = data.slice(0, initialLimit);

  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  
  const [showRight, setShowRight] = useState(false); // initially hide

const [hasScrolled, setHasScrolled] = useState(false); // lock mouse events after scroll
const [display, setDisplay] = useState(false); // 

 
 
  

 
  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 450; // ek card ke barabar
   
    
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };
 
  const checkScroll = () => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
   
      if(!(scrollLeft == 0)){
        setHasScrolled(true)
      }
      setShowLeft(scrollLeft > 0);
      setShowRight(Math.ceil(scrollLeft + clientWidth) < Math.ceil(scrollWidth));
    };



  useEffect(() => {
    checkScroll();
 
    
    const scrollEl = scrollRef.current;
    scrollEl?.addEventListener("scroll", checkScroll);
    return () => scrollEl?.removeEventListener("scroll", checkScroll);
  }, []);

 


  
 

  return (
    <div className="w-full p-5 relative"
   onMouseEnter={() => {
      if (!hasScrolled) setDisplay(true);
    }}
    onMouseLeave={() => {
      if (!hasScrolled) setDisplay(false);
    }}  >
 
      <div className="flex items-center justify-between mb-4">


           {
      viewMoreRoute &&   
        <h2 className="text-3xl font-semibold text-zinc-400">{title}</h2>
           }
    {
      viewMoreRoute &&     <Link
  to={viewMoreRoute}
  className={`text-sm text-red-500 hover:underline transition-opacity duration-300 font-bold ${
    display ? "opacity-100 visible" : "opacity-0 invisible"
  }`}
>
  View All 
</Link>
    }

      </div>

  



  
 
 <div  className="w-full flex gap-5 overflow-x-hidden scrollbar-hide   scroll-smooth   relative  ">
  
      <button
  onClick={() => scroll("left")}
  className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-opacity duration-300
    ${showLeft ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
>
  <FaChevronLeft />
</button>

<button
  onClick={() => scroll("right")}
  className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-opacity duration-300
    ${showRight && display ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
>
  <FaChevronRight />
</button>

   <div
        ref={scrollRef}
        className="w-full flex gap-5 overflow-hidden scrollbar-hide  scroll-smooth relative  
         ">

        {data.length > 0 && limitedData.map((d, i) => (
              <Link to={ d.season_number ? `/tv/${original}/season/${d.season_number}`
      : `/${d.media_type || title }/details/${d.id}`}  key={i}
                className="min-w-[450px] rounded-lg bg-zinc-900 overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
    
                <img src={
    d.backdrop_path || d.poster_path
      ? `https://image.tmdb.org/t/p/w500${d.backdrop_path || d.poster_path}`
      : altpic
  }
  alt={d.title || d.name || "No Image"}
  className={`w-full h-[300px] rounded-lg transition-transform duration-300 hover:scale-105 ${
    d.backdrop_path || d.poster_path ? "object-cover" : "object-contain"
  }`}
/>

                <div className="px-3 py-2 bg-gradient-to-t from-black/60 to-transparent relative">
                  <h3 className="text-lg font-semibold text-zinc-200 truncate">
                    { d.title  || d.original_title || d.name || d.original_name   }
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2">
                    {d.overview?.slice(0, 80)}...
                  </p>
                </div>
              </Link>
            ))
           }
      </div>
 </div>
     
    </div>
  );
}

