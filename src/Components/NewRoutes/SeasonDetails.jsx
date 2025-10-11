import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeloadSeason } from "../../Store/reducers/seasonSlice";
import { asyncloadseason } from "../../Store/actions/seasonActions";
import Loading from "../Loading";
import image from "/image2.png";
import HorizCards from "../partials/HorizCards";
import { removetv } from "../../Store/reducers/tvSlice";
import { asyncloadtv } from "../../Store/actions/tvActions";
import Navbar from "../partials/Navbar";
 
 
function SeasonDetails() {
  const { id, season_number } = useParams();  
  const dispatch = useDispatch();
  const { pathname } = useLocation()
const {info} = useSelector((state) => state.season);
 let navigate = useNavigate()
      // const { info } = useSelector((state) => state.tv)                  
    
const { info: tvInfo } = useSelector((state) => state.tv);


  useEffect(() => {
        dispatch(asyncloadseason(id, season_number));
 
 
     return () => {
        dispatch(removeloadSeason());
     
        
      };
  }, [id, season_number]);

useEffect(() => {
      dispatch(asyncloadtv(id,season_number));

      
      return () => {
        dispatch(removetv());
      };
    }, [id]);

 

 
  
  return (tvInfo) && (info) ? (
  

      <div style={{
  backgroundImage: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.7), rgba(0,0,0,.9)), url(${
    tvInfo.detail.backdrop_path
      ? `https://image.tmdb.org/t/p/original/${tvInfo.detail.backdrop_path}`
      : "https://placehold.co/1920x1080?text=No+Image"
  })`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  height: "100%",
}}

  className="relative w-full h-full    px-4 sm:px-6 xl:px-[10%] py-6  ">
      {/* 🔹 Navigation */}
      <nav className="h-[8vh] w-full flex items-center gap-6 sm:gap-10 text-zinc-100 text-lg sm:text-2xl
     pl-[30px] xl:pl-[0px] flex-wrap     xl:justify-start">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#DD4343] ri-arrow-left-line"
        ></Link>
        {/* Homepage */}
{tvInfo.detail?.homepage && (
  <a target="_blank" rel="noreferrer" href={tvInfo.detail.homepage}>
    <i className="ri-external-link-fill"></i>
  </a>
)}

{/* Wikidata */}
{tvInfo.externalid?.wikidata_id && (
  <a target="_blank" rel="noreferrer" href={`https://www.wikidata.org/wiki/${tvInfo.externalid.wikidata_id}`}>
    <i className="ri-earth-fill"></i>
  </a>
)}

{/* IMDb */}
{tvInfo.externalid?.imdb_id && (
  <a target="_blank" rel="noreferrer" href={`https://www.imdb.com/title/${tvInfo.externalid.imdb_id}/`} className="hover:text-[#F5C518]">
    IMDb
  </a>
)}


        <Navbar/>
      </nav>

      {/* 🔹 Poster + Details */}
      <div className="w-full flex flex-col md:flex-row gap-6 mt-6 justify-between">
        <img
          className="shadow-lg h-[40vh] sm:h-[50vh] md:h-[55vh] object-cover rounded-xl mx-auto md:mx-0"
         

         src={ info.images.posters.length>0 
                 ? `https://image.tmdb.org/t/p/original${info.images.posters[0].file_path}`: image}
          alt=""
        />
 
        
          <div className="content md:ml-[5%] flex flex-col text-white  justify-center items-center">
     
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black">
            {tvInfo.detail.original_title || tvInfo.detail.title || tvInfo.detail.name || tvInfo.detail.original_name}
   
            <small className="text-lg sm:text-xl md:text-2xl font-bold text-zinc-400 ml-2">
              ({tvInfo.detail.first_air_date.split("-")[0]})
            </small>
          </h1>

          {/* Ratings + Meta */}
  

  <div className="flex flex-wrap gap-8 text-zinc-200 font-semibold mt-4 mb-6   justify-center lg:justify-start">

  {/* User Score */}
  <div className="flex flex-col items-center">
    <h1 className="text-sm sm:text-base md:text-base">User Score</h1>
    <span className="w-8 h-8 flex justify-center items-center font-semibold rounded-full bg-[#ee9e3d] text-black mt-1">
      {tvInfo.detail?.vote_average?.toFixed(1) || "N.A"}
    </span>
  </div>

  {/* Release Date */}
  <div className="flex flex-col items-center">
    <h1 className="text-sm sm:text-base md:text-base">Release Date</h1>
    <span className="mt-1">{info.tries?.air_date

 || "N.A"}</span>
  </div>

  {/* Genres */}
  <div className="flex flex-col items-center">
    <h1 className="text-sm sm:text-base md:text-base">Genres</h1>
    <span className="mt-1">{tvInfo.detail?.genres?.length > 0 ? tvInfo.detail.genres.map((g) => g.name).join(", ") : "N.A"}</span>
  </div>

  {/* Runtime */}
  <div className="flex flex-col items-center">
    <h1 className="text-sm sm:text-base md:text-base">Runtime</h1>
 

    <span className="mt-1">
  {info.tries?.episodes?.find(ep => ep.runtime)?.runtime
    ? `${info.tries.episodes.find(ep => ep.runtime).runtime} min`
    : "N.A"}
</span>

  </div>
</div>

          <h1 className="text-lg sm:text-xl mt-5 mb-2">Overview</h1>
          <p className="text-sm sm:text-base text-zinc-200">{tvInfo.detail.overview}</p>



           <h1 className="text-lg sm:text-xl mt-5 mb-2">Original Language</h1>
           <p className="text-sm sm:text-base text-zinc-200">{tvInfo.detail.spoken_languages.length >0 
                      ? tvInfo.detail.spoken_languages[0].english_name     : "N.A"      
              
              }</p>

          <h1 className="text-lg sm:text-xl mt-5 mb-2">TV Translated</h1>
          <p className="text-sm text-zinc-300">{tvInfo.translations.join(", ")}</p>
      

                      <div className="mt-8">
  <h2 className="text-lg font-semibold mb-2 text-center">Trailer</h2>
  {info.videos?.results?.length > 0 ? (
    <Link
      to={`${pathname}/trailer`}
      className="px-5 py-3 rounded-md bg-[#6556CD] hover:bg-[#4c44b0] transition text-white font-semibold flex items-center gap-2 w-max justify-center"
    >
      <i className="ri-play-line text-xl"></i> Play Trailer
    </Link>
  ) : (
    <div className="font-semibold text-zinc-300">Trailer not available</div>
  )}
</div>


        </div>
      </div>

 
       <div className="w-full  md:flex-row  flex flex-col gap-6 mt-10 text-white justify-center items-center">
        {tvInfo.watchproviders?.flatrate && (
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="w-full sm:w-auto font-semibold">Available on</h1>
            {tvInfo.watchproviders.flatrate.map((w, index) => (
              <img
                key={index}
                title={w.provider_name}
                className="w-12 h-12 rounded-md object-cover"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
        {tvInfo.watchproviders?.buy && (
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="w-full sm:w-auto font-semibold">Available to Buy</h1>
            {tvInfo.watchproviders.buy.map((w, index) => (
              <img
                key={index}
                title={w.provider_name}
                className="w-12 h-12 rounded-md object-cover"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
        {tvInfo.watchproviders?.rent && (
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="w-full sm:w-auto font-semibold">Available on Rent</h1>
            {tvInfo.watchproviders.rent.map((w, index) => (
              <img
                key={index}
                title={w.provider_name}
                className="w-12 h-12 rounded-md object-cover"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
      </div>

      {/* 🔹 Seasons */}
      {tvInfo.detail.seasons?.length > 0 && (
        <>
          <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-600" />
          <h1 className="mt-10 ml-0 md:ml-5 text-3xl font-semibold text-white">Seasons</h1>
     
          <HorizCards
        data={tvInfo.detail.seasons.filter(season =>   season.season_number !== 0)}
   title="seaon detal kahorizcardas" original={tvInfo.detail.id}/>
        </>
      )}

      {/* 🔹 Recommendations */}
  
      <hr className="mt-10 mb-6 border-none h-[2px] bg-zinc-600" />


      {(tvInfo.recommendations?.length > 0 || tvInfo.similar?.length > 0) && (
  <>
    <h1 className="text-xl sm:text-2xl font-semibold text-white mb-4">
      {tvInfo.recommendations?.length > 0
        ? "Recommendations"
        : "Similar Stuff"}
    </h1>

    <HorizCards
      data={tvInfo.recommendations?.length > 0 ? tvInfo.recommendations : tvInfo.similar}
      original={tvInfo.detail.id}/>
  </>
)}
  

      <Outlet />
    </div>
  ) :  <Loading />

}

export default SeasonDetails;
