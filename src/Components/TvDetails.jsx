 
  import React, { useEffect } from 'react'
  import { useNavigate, useParams, Link, useLocation, Outlet } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import { asyncloadtv  } from "../Store/actions/tvActions";
  import Loading from './Loading';
  import HorizCards from './partials/HorizCards';
  import { removetv } from '../Store/reducers/tvSlice';
    import image from '/image2.png'
   
import Navbar from './partials/Navbar';
import HorizPeople from './partials/HorizPeople';

  export default function TvDetails() {
    const { pathname } = useLocation()
    const navigate = useNavigate();
    const { id } = useParams();
    const { info } = useSelector((state) => state.tv);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(asyncloadtv(id));
      console.log(info);
     
      
      
      return () => {
        dispatch(removetv());
      };
    }, [id]);


    useEffect(()=>{
      
      
  console.log(info,"info.detail.id");
 

    },[info])

 
    return info ? (
    <div
  style={{
    backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${
    info.detail.backdrop_path
      ? `https://image.tmdb.org/t/p/original${info.detail.backdrop_path}`
      : "https://placehold.co/1920x1080?text=No+Image"
  })`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  }}
  className={`relative w-full px-4 sm:px-6 xl:px-[10%] py-6  ${
    info.recommendations.length > 0 || info.similar.length > 0 ? "h-full" : "h-screen"
  }`}>
        <nav className="h-[8vh] w-full flex items-center gap-x-6 sm:gap-x-10  text-zinc-100 text-lg sm:text-2xl
        pl-[30px] xl:pl-[0px] flex-wrap  xl:justify-start">
        

          <Link onClick={() => navigate(-1)}
             className="hover:text-[#DD4343] ri-arrow-left-line" ></Link>
          {info.detail.homepage && (
            <a target="_blank" rel="noreferrer" href={info.detail.homepage}>
              <i className="ri-external-link-fill"></i>
            </a>
          )}
          
          {/* Wikidata */}
          {info.externalid?.wikidata_id && (
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="ri-earth-fill"></i>
            </a>
          )}
          
          {/* IMDb */}
          {info.externalid?.imdb_id && (
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
              className="hover:text-[#F5C518]"
            >
              IMDb
            </a>
          )}


          <Navbar/>
        </nav>


        <div className="w-full flex flex-col md:flex-row gap-6 mt-6   justify-between">


         <img className="shadow-lg h-[40vh] sm:h-[50vh] md:h-[55vh] object-cover 
          rounded-xl mx-auto md:mx-0"
          src={ info.detail.poster_path
          ? `https://image.tmdb.org/t/p/original${info.detail.poster_path}`: image}
            alt={info.detail.name || "Error!"} />
 

            <div className="content md:ml-[5%] flex flex-col text-white  justify-center items-center">
      
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black">
              {info.detail.original_title || info.detail.title || info.detail.name || info.detail.original_name}
        
              <small className="text-lg sm:text-xl md:text-2xl font-bold text-zinc-400 ml-2">
                ({info.detail.first_air_date.split("-")[0]})
              </small>
            </h1>


  
      
  <div className="flex flex-wrap gap-8 text-zinc-200 font-semibold mt-4 mb-6   justify-center lg:justify-start">

  <div className="flex flex-col items-center">
    <h1 className="text-sm sm:text-base md:text-base">User Score</h1>
    <span className="w-8 h-8 flex justify-center items-center font-semibold rounded-full bg-[#ee9e3d] text-black mt-1">
      {info.detail?.vote_average?.toFixed(1) || "N.A"}
    </span>
  </div>


  <div className="flex flex-col items-center">
    <h1 className="text-sm sm:text-base md:text-base">Release Date</h1>
    <span className="mt-1">{info.detail.first_air_date
 || "N.A"}</span>
  </div>


  <div className="flex flex-col items-center">
    <h1 className="text-sm sm:text-base md:text-base">Genres</h1>
    <span className="mt-1">{info.detail?.genres?.length > 0 ? info.detail.genres.map((g) => g.name).join(", ") : "N.A"}</span>
  </div>

 
  <div className="flex flex-col items-center">
    <h1 className="text-sm sm:text-base md:text-base">Runtime</h1>
    <span className="mt-1"> {info.detail?.episode_run_time.length> 0
    ? `${info.detail.episode_run_time[0]} min` 
    : "N.A"}</span>
  </div>
</div>

   <h1 className="text-lg sm:text-xl mt-5 mb-2">Overview</h1>
            <p className="text-sm sm:text-base text-zinc-200">{info.detail.overview || "N.A"}</p>

            <h1 className="text-lg sm:text-xl mt-5 mb-2">Original Language</h1>
            <p className="text-sm sm:text-base text-zinc-200">{info.detail.spoken_languages.length >0 
                      ? info.detail.spoken_languages[0].english_name     : "N.A"      
              
              }</p>

            <h1 className="text-lg sm:text-xl mt-5 mb-2">TV Translated</h1>
            <p className="text-sm text-zinc-300">{info.translations.join(", ") || "N.A"}</p>
      <div className="mt-8">
  <h2 className="text-lg font-semibold mb-2 text-center">Trailer</h2>
  {info.videos ? (
    <Link
      to={`${pathname}/trailer`}
      className="px-5 py-3 rounded-md bg-[#6556CD] hover:bg-[#4c44b0] transition text-white font-semibold flex items-center gap-2 w-max justify-center"
    >
      <i className="ri-play-line text-xl"></i> Play Trailer
    </Link>
  ) : (
    <div className="font-semibold text-zinc-300 text-center">N.A</div>
  )}
</div>


          </div>
        </div>

   
  
 <HorizPeople data={info.credits} title="cast"/>
          {info.watchproviders?.flatrate && (

            <div  className="w-full  md:flex-row  flex flex-col gap-6 mt-10 text-white justify-center items-center">
            <div className="flex flex-wrap items-center gap-4">
              <h1 className="w-full sm:w-auto font-semibold">Available on Platform</h1>
              {info.watchproviders.flatrate.map((w, index) => (
                <img
                  key={index}
                  title={w.provider_name}
                  className="w-12 h-12 rounded-md object-cover"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt={w.provider_name}
                />
              ))}
            </div>
            </div>
          )}
          {info.watchproviders?.buy && (
            <div className="flex flex-wrap items-center gap-4">
              <h1 className="w-full sm:w-auto font-semibold">Available to Buy</h1>
              {info.watchproviders.buy.map((w, index) => (
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
          {info.watchproviders?.rent && (
            <div className="flex flex-wrap items-center gap-4">
              <h1 className="w-full sm:w-auto font-semibold">Available on Rent</h1>
              {info.watchproviders.rent.map((w, index) => (
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
      

        {info.detail.seasons?.length > 0 ? (
  <>
    <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-600" />
    <h1 className="mt-10 ml-0 md:ml-5 text-3xl font-semibold text-white">Seasons</h1>
    <HorizCards
      data={info.detail.seasons.filter(
        (season) =>  season.season_number !== 0
      )}
      original={info.detail.id}

    />
  </>
) : (
  <div className="mt-10 text-white font-semibold text-lg">
    No seasons available
  </div>
)}



 
        <hr className="mt-10 mb-6 border-none h-[2px] bg-zinc-600" />
{(info.recommendations?.length > 0 || info.similar?.length > 0) && (
  <>
    <h1 className="text-xl sm:text-2xl font-semibold text-white mb-4">
      {info.recommendations?.length > 0
        ? "Recommendations"
        : "Similar Stuff"}
    </h1>

    <HorizCards
      data={info.recommendations?.length > 0 ? info.recommendations : info.similar}
      original={info.detail.id}
      title="tv"

    />
  </>
)}

        <Outlet />
      </div>
    ) : (
      <Loading />
    );
  }
