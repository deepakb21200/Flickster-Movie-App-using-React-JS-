
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
  import "./leftsidebar.css"
 import fabs from '/clapperboard.png'
export default function LeftSideBar() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
 
  const menuItems = [
    { to: "/trending", icon: "ri-fire-fill", label: "Trending" },
    { to: "/popular", icon: "ri-bard-fill", label: "Popular" },
    { to: "/movie", icon: "ri-movie-2-fill", label: "Movies" },
    { to: "/tv", icon: "ri-tv-2-fill", label: "Tv Shows" },
    { to: "/people", icon: "ri-team-fill", label: "People" },
  ];

  const infoItems = [
    { to: "/aboutus", icon: "ri-information-fill", label: "About Us" },
    { to: "/contact", icon: "ri-contacts-fill", label: "Contact Us" },
  ];

  const isExpanded = open || hovered;

  return (
    <div
      className={`fixed top-0 left-0 h-full z-40
               
                 flex flex-col gap-6   justify-center
                 transition-all duration-300 ease-in-out 
                 overflow-hidden items-center  
                 ${isExpanded ? "xl:w-[15%] w-[100%] md:w-[30%] bg-gradient-to-b from-[#1b1b2f] to-[#2c2c3e]" : "w-[40px]"}`}
                    onMouseLeave={() => !open && setHovered(false)}
    >
      {/* Burger Button for small screens */}
      <button
        className="lg:hidden text-white text-2xl mb-4 self-center"
        onClick={() => setOpen(!open)}
      >
        <HiMenuAlt3 />
      </button>

      {/* Logo + hover trigger */}
      <div
        className="rocks w-full cursor-pointer  "
        onMouseEnter={() => !open && setHovered(true)}
        // onMouseLeave={() => !open && setHovered(false)}
      >
        <div className="flex items-center  justify-center flex-shrink-0   text-white font-bold text-lg">
 
          <Link to="/" className="flex overflow-hidden whitespace-nowrap transition-all  w-full justify-center">
            <img src={fabs} alt="errror here!!" className="w-[28px] h-[28px]" />

            <div className={`overflow-hidden whitespace-nowrap transition-all
          duration-300 ${isExpanded ? "max-w-full opacity-100 ml-[8px]" : "max-w-0 opacity-0"}`}>
        Movie App</div>
          </Link>
       
   
          {/* <Link  to="/" className={`overflow-hidden whitespace-nowrap transition-all
          duration-300 ${isExpanded ? "max-w-full opacity-100 ml-[8px]" : "max-w-0 opacity-0"}`}>
        Movie App</Link> */}

        </div>

        {/* Menu Items */}
        <nav className="flex flex-col gap-3 mt-6  ">
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.to}
              className={`flex items-center justify-center text-[#cbd5e1] p-2 rounded-lg hover:bg-[#2c2c3e] transition  flex-shrink-0  menu-link`}
            >
              <i className={`${item.icon} text-[1.3rem] flex-shrink-0`}></i>
              <span
                className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                  isExpanded ? "max-w-full opacity-100 ml-[10px]" : "max-w-0 opacity-0 "
                }`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

 
        {/* Info Items */}
        <nav className="flex flex-col gap-3 w-full">
          {infoItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.to}
              className={`flex items-center justify-center text-[#cbd5e1] p-2 rounded-lg hover:bg-[#2c2c3e] transition menu-link ${
                isExpanded ? "gap-4" : "gap-0"
              }`}
            >
              <i className={`${item.icon} text-[1.3rem] flex-shrink-0`}></i>
              <span
                className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                  isExpanded ? "max-w-full opacity-100" : "max-w-0 opacity-0"
                }`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

