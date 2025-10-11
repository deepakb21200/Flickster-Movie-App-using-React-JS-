import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5"; // Close Icon
import "./leftsidebar.css";
import fabs from "/clapperboard.png";

export default function LeftSideBar() {
  const [showCanvas, setShowCanvas] = useState(false);

  const menuItems = [
    { to: "/trending", icon: "ri-fire-fill", label: "Trending" },
    { to: "/popular", icon: "ri-bard-fill", label: "Popular" },
    { to: "/movie", icon: "ri-movie-2-fill", label: "Movies" },
    { to: "/tv", icon: "ri-tv-2-fill", label: "Tv Shows" },
    


     { to: "/movie-genre", icon: "ri-folder-music-fill", label: "Movies by Genre" },
  { to: "/tv-genre", icon: "ri-folder-4-fill", label: "TV Shows by Genre" },
  { to: "/under-rated-movies", icon: "ri-star-half-fill", label: "Underrated Movies" },
  { to: "/classic-movies", icon: "ri-book-read-fill", label: "Classic Movies" },
  { to: "/documentaries", icon: "ri-vidicon-fill", label: "Documentaries" },


  { to: "/people", icon: "ri-team-fill", label: "People" },
  ];

  const infoItems = [
    { to: "/aboutus", icon: "ri-information-fill", label: "About Us" },
    { to: "/contact", icon: "ri-contacts-fill", label: "Contact Us" },
  ];

  return (
    <>
      {/* 🔹 Open Button (Hamburger) - Always visible */}
      {!showCanvas && (
        <button
          className="fixed xl:top-7  top-5 md:top-7 left-4 z-50 text-white text-3xl"
          onClick={() => setShowCanvas(true)} >
          <HiMenuAlt3 />
        </button>
      )}

      {/* Overlay */}
      {showCanvas && (
        <div  className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowCanvas(false)}></div>
      )}

      {/* 🔹 Offcanvas Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#1c1c27] text-white z-50 
        transform transition-transform duration-300 ease-in-out  
        ${showCanvas ? "translate-x-0" : "-translate-x-full"} 
        w-[250px]`} >

        {/* Header Section with Logo + Close Button */}
        <div className="flex items-center justify-between gap-3 p-4 border-b border-gray-700">
          <div className="flex items-center gap-3 ">
            {/* <img src={fabs} alt="logo" className="w-[28px] h-[28px]" /> */}
            <Link to="/" className="font-bold text-lg whitespace-nowrap flex items-center justify-center
            gap-2 "
            onClick={() => setShowCanvas(false)}>
               <img src={fabs} alt="logo" className="w-[28px] h-[28px] " />
              <div>Flickster App</div>
            </Link>
          </div>

          {/* 🔹 Close Button - Always visible */}

          <button
            className="text-2xl"
            onClick={() => setShowCanvas(false)} >
            <IoClose />
          </button>
        </div>

  
          {/* Menu Items */}
        <nav className="flex flex-col gap-2 p-4 ">
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.to}
              className="flex items-center gap-3 text-[#cbd5e1] p-2 rounded-lg hover:bg-[#2c2c3e] transition menu-link justify-center"
              onClick={() => setShowCanvas(false)}
            >
              <i className={`${item.icon} text-[1.3rem]`}></i>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Info Items */}
        <nav className="flex flex-col gap-2 p-4 mt-auto">
          {infoItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.to}
              className="flex items-center gap-3 text-[#cbd5e1] p-2 rounded-lg hover:bg-[#2c2c3e] transition menu-link justify-center"
              onClick={() => setShowCanvas(false)}
            >
              <i className={`${item.icon} text-[1.3rem]`}></i>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
    
      </div>
    </>
  );
}














