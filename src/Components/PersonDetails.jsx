import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "../Store/actions/personActions";
import {
  useNavigate,
  useParams,
  Link,
 
} from "react-router-dom";
import Dropdown from './partials/Dropdown';
import Loading from './Loading';
import HorizCards from './partials/HorizCards';
    import image from '/image2.png'
export default function PersonDetails() {

  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();
  const [category, setcategory] = useState("movie");

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);


return info ? (
  <div className="px-4 md:px-[30px] w-full bg-gray-900 min-h-screen">
    {/* Navigation */}
    <nav className="h-[5vh] w-full flex items-center gap-6 text-gray-200 text-xl md:text-2xl">
      <Link
        onClick={() => navigate(-1)}
        className="hover:text-indigo-400 ri-arrow-left-line"
      >
        Back
      </Link>
    </nav>

    {/* Main Layout */}
    <div className="w-full flex flex-col lg:flex-row gap-10">
      {/* Left Panel */}
      <div className="w-full lg:w-[20%]">
        <img
          className="w-full h-auto max-h-[38vh] object-cover rounded-xl shadow-lg shadow-indigo-900/50"
          src={
    info.detail.profile_path
      ? `https://res.cloudinary.com/dcb3u3vy8/image/fetch/https://image.tmdb.org/t/p/original/${info.detail.profile_path}`
      : image
  }
          alt={info.detail.id}
        />
        <hr className="mt-10 mb-5 border-none h-[2px] bg-gray-600" />

        {/* Social Links */}
        <div className="text-2xl text-gray-300 flex flex-wrap gap-4">
          <a target="_blank" href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}><i className="ri-earth-fill hover:text-indigo-400"></i></a>
          <a target="_blank" href={`https://www.facebook.com/${info.externalid.facebook_id}`}><i className="ri-facebook-circle-fill  hover:text-indigo-400"></i></a>
          <a target="_blank" href={`https://www.instagram.com/${info.externalid.instagram_id}`}><i className="ri-instagram-fill  hover:text-indigo-400"></i></a>
          <a target="_blank" href={`https://twitter.com/${info.externalid.twitter_id}`}><i className="ri-twitter-x-fill  hover:text-indigo-400"></i></a>
        </div>

        <div className="mt-6 space-y-3 text-gray-200 text-base md:text-lg lg:text-xl font-medium bg-gray-800 p-5 rounded-xl shadow-md shadow-black/40">
          <h1 className="text-2xl   font-bold">Person Info</h1>
          <p><span className="font-semibold text-gray-100">Known For:</span> {info.detail.known_for_department  || "N.A"}</p>
        <p>
          <span className="font-semibold text-gray-100">Gender:</span>{" "}
       {info.detail?.gender === 2 ? "Male" : info.detail?.gender === 1  ? "Female"  : "N.A"}</p>

          <p><span className="font-semibold text-gray-100">Birthday:</span> {info.detail.birthday || "N.A"}</p>
          <p><span className="font-semibold text-gray-100">Deathday:</span> {info.detail.deathday || "Still Alive"}</p>
          <p><span className="font-semibold text-gray-100">Place Of Birth:</span> {info.detail.place_of_birth
          || "N.A"}</p>
          <p><span className="font-semibold text-gray-100">Also Known As:</span> {info.detail.also_known_as.join(", ")  || "N.A"}</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-[75%]">
        <h1 className="text-4xl md:text-6xl text-gray-200 font-black mb-4">{info.detail.name || "N.A"}</h1>
        <h2 className="text-lg md:text-xl text-gray-300 font-semibold">Biography</h2>
        <p className="text-gray-300 mt-3 whitespace-pre-line">{info.detail.biography  || "N.A"}</p>

      {info.combinedCredits?.cast?.length > 0 && (
         <>
    <h2 className="mt-5 text-lg text-gray-300 font-semibold">Popular For</h2>
    <HorizCards data={info.combinedCredits.cast} />
  </>)}




          <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center mt-5">
          <h2 className="text-xl text-gray-300 font-semibold mb-2 md:mb-0">Acting</h2>
          <Dropdown title="Category" options={["tv", "movie"]} func={(e) => setcategory(e.target.value)} value={category} />
        </div>

        <ul className="list-disc w-full max-h-[50vh] mt-5 mb-6 overflow-y-auto border border-gray-700 p-5 rounded-xl bg-gray-800 shadow-lg shadow-black/50">
          {info[category + "Credits"].cast.map((c, i) => (
            <li
              key={i}
              className="cursor-pointer p-3 rounded-md hover:bg-indigo-700 hover:text-yellow-300 transition-colors duration-300"
            >
              <Link to={`/${category}/details/${c.id}`} className="block">
                <span className="text-gray-100 font-medium">{c.name || c.title || c.original_name || c.original_title}</span>
                {c.character && (
                  <span className="block mt-1 text-gray-400 text-sm">Character: {c.character}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>  


      </div>
    </div>
  </div>
) : (
  <Loading />
);


}






  