
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { HiMenuAlt3 } from "react-icons/hi";
//   import "./leftsidebar.css"
//  import fabs from '/clapperboard.png'
// export default function LeftSideBar() {
//   const [open, setOpen] = useState(false);
//   const [hovered, setHovered] = useState(false);
 
//   const menuItems = [
//     { to: "/trending", icon: "ri-fire-fill", label: "Trending" },
//     { to: "/popular", icon: "ri-bard-fill", label: "Popular" },
//     { to: "/movie", icon: "ri-movie-2-fill", label: "Movies" },
//     { to: "/tv", icon: "ri-tv-2-fill", label: "Tv Shows" },
//     { to: "/people", icon: "ri-team-fill", label: "People" },
//   ];

//   const infoItems = [
//     { to: "/aboutus", icon: "ri-information-fill", label: "About Us" },
//     { to: "/contact", icon: "ri-contacts-fill", label: "Contact Us" },
//   ];

//   const isExpanded = open || hovered;

//   return (
//     <div
//       className={`fixed top-0 left-0 h-full z-40
               
//                  flex flex-col gap-6   justify-center
//                  transition-all duration-300 ease-in-out 
//                  overflow-hidden items-center  
//                  ${isExpanded ? "xl:w-[15%] w-[100%] md:w-[30%]" : "w-[40px]"}`}
//                     onMouseLeave={() => !open && setHovered(false)}
//     >
//       {/* Burger Button for small screens */}
//       <button
//         className="lg:hidden text-white text-2xl mb-4 self-center"
//         onClick={() => setOpen(!open)}
//       >
//         <HiMenuAlt3 />
//       </button>

//       {/* Logo + hover trigger */}
//       <div
//         className="rocks w-full cursor-pointer  "
//         onMouseEnter={() => !open && setHovered(true)}
//         // onMouseLeave={() => !open && setHovered(false)}
//       >
//         <div className="flex items-center  justify-center flex-shrink-0   text-white font-bold text-lg">
 
//           <Link to="/" className="flex overflow-hidden whitespace-nowrap transition-all  w-full justify-center">
//             <img src={fabs} alt="errror here!!" className="w-[28px] h-[28px]" />

//             <div className={`overflow-hidden whitespace-nowrap transition-all
//           duration-300 ${isExpanded ? "max-w-full opacity-100 ml-[8px]" : "max-w-0 opacity-0"}`}>
//         Movie App</div>
//           </Link>
       
   
//           {/* <Link  to="/" className={`overflow-hidden whitespace-nowrap transition-all
//           duration-300 ${isExpanded ? "max-w-full opacity-100 ml-[8px]" : "max-w-0 opacity-0"}`}>
//         Movie App</Link> */}

//         </div>

//         {/* Menu Items */}
//         <nav className="flex flex-col gap-3 mt-6  ">
//           {menuItems.map((item, idx) => (
//             <Link
//               key={idx}
//               to={item.to}
//               className={`flex items-center justify-center text-[#cbd5e1] p-2 rounded-lg hover:bg-[#2c2c3e] transition  flex-shrink-0  menu-link`}
//             >
//               <i className={`${item.icon} text-[1.3rem] flex-shrink-0`}></i>
//               <span
//                 className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
//                   isExpanded ? "max-w-full opacity-100 ml-[10px]" : "max-w-0 opacity-0 "
//                 }`}
//               >
//                 {item.label}
//               </span>
//             </Link>
//           ))}
//         </nav>

 
//         {/* Info Items */}
//         <nav className="flex flex-col gap-3 w-full">
//           {infoItems.map((item, idx) => (
//             <Link
//               key={idx}
//               to={item.to}
//               className={`flex items-center justify-center text-[#cbd5e1] p-2 rounded-lg hover:bg-[#2c2c3e] transition menu-link ${
//                 isExpanded ? "gap-4" : "gap-0"
//               }`}
//             >
//               <i className={`${item.icon} text-[1.3rem] flex-shrink-0`}></i>
//               <span
//                 className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
//                   isExpanded ? "max-w-full opacity-100" : "max-w-0 opacity-0"
//                 }`}
//               >
//                 {item.label}
//               </span>
//             </Link>
//           ))}
//         </nav>
//       </div>
//     </div>
//   );
// }

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
          className="fixed top-4 left-4 z-50 text-white text-3xl"
          onClick={() => setShowCanvas(true)}
        >
          <HiMenuAlt3 />
        </button>
      )}

      {/* Overlay */}
      {showCanvas && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setShowCanvas(false)}
        ></div>
      )}

      {/* 🔹 Offcanvas Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#1c1c27] text-white z-50 
        transform transition-transform duration-300 ease-in-out  
        ${showCanvas ? "translate-x-0" : "-translate-x-full"} 
        w-[250px]`}
      >
        {/* Header Section with Logo + Close Button */}
        <div className="flex items-center justify-between gap-3 p-4 border-b border-gray-700">
          <div className="flex items-center gap-3 ">
            <img src={fabs} alt="logo" className="w-[28px] h-[28px]" />
            <Link to="/" className="font-bold text-lg whitespace-nowrap"
            onClick={() => setShowCanvas(false)}>
              Flickster App
            </Link>
          </div>

          {/* 🔹 Close Button - Always visible */}
          <button
            className="text-2xl"
            onClick={() => setShowCanvas(false)}
          >
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

