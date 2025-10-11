import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa"; 
  import altpic from '/noimages.png'
import { Link } from "react-router-dom";

export default function HorizPeople({data}) {

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
  className="w-full flex gap-5 overflow-hidden  scrollbar-hide scroll-smooth relative "
   style={{
    scrollbarWidth: 'none',        // Firefox
    msOverflowStyle: 'none'        // IE 10+
  }}
>
  {data.length > 0 &&
    data.map((d, i) => (
      <Link
        to={`/person/details/${d.id}`} // actor detail page
        key={i}
        className="min-w-[200px] h-[260px] rounded-lg bg-zinc-900 overflow-hidden  transform transition duration-300 hover:scale-105 hover:shadow-2xl "
      >
   
        <img
          src={
            d.profile_path
              ? `https://image.tmdb.org/t/p/original${d.profile_path}`
              : altpic
          }
          alt={d.name || "No Image"}
          className="w-full h-[200px] object-cover rounded-lg transition-transform duration-300 hover:scale-105"
        />


        <div className="px-2 py-1 text-center">
          <h3 className="text-sm font-semibold text-zinc-100 truncate">
            {d.name}
          </h3>
        </div>
      </Link>
    ))}
</div>

 </div>
     
    </div>
  );
}

