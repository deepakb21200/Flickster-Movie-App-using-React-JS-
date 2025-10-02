import React from 'react'
import { Link } from 'react-router-dom'

export default function Header({ data }) {

 
    return (
 

<div
  style={{
    background: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.7), rgba(0,0,0,.9)),url(https://image.tmdb.org/t/p/original/${
      data.backdrop_path || data.profile_path
    })`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  }}
  className="bg-black w-full h-[60vh] md:h-[70vh] lg:h-[80vh] flex flex-col justify-end   sm:p-8 md:p-[6.5%] items-start p-[20px]  "
>
  {/* Title */}
  <h1 className="w-full sm:w-[90%] md:w-[70%] text-2xl sm:text-3xl md:text-5xl font-bold text-white leading-tight">
    {data.title || data.original_title    || data.name || data.original_name}
  </h1>

  {/* Overview */}
  <p className="text-white w-full sm:w-[90%] md:w-[70%] text-sm sm:text-base md:text-lg mt-2">
    {data.overview.slice(0, 260)}...
    <Link className="text-blue-500 ml-1"  to={`/${data.media_type}/details/${data.id}`} >more</Link>
  </p>

  {/* Release date */}
  <p className="flex items-center gap-2 text-sm sm:text-base text-gray-300 mt-2">
    <i className="text-yellow-400 ri-megaphone-fill"></i>
    {data.release_date || "No information"}
  </p>

  {/* Media type */}
  <p className="flex items-center gap-2 text-sm sm:text-base text-gray-300">
    <i className="text-yellow-400 ri-album-line"></i>
    {data.media_type.toUpperCase()}
  </p>

  {/* Button */}
  <Link className="text-white px-4 py-2 sm:px-6 sm:py-3 mt-4 rounded-lg text-sm sm:text-base md:text-lg bg-[#DD4343] hover:bg-red-600 transition" to={`/${data.media_type}/details/${data.id}/trailer`}>
    Watch Trailer
  </Link>
</div>
  )
}
 