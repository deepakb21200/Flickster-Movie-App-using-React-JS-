 
 
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

 

function Video() {  
  const { season_number } = useParams();
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const category = season_number ? "season" : pathname.includes("movie") ? "movie" : "tv";
  
 const ytvideo = useSelector((state) => state[category].info.videos)
 
  return (
    // w-screen h-screen
    <div className='top-[0] left-0 z-[1000] absolute w-full h-screen flex items-center justify-center text-2xl text-white bg-[rgba(0,0,0,.9)] '>
      <Link
        onClick={() => navigate(-1)}
        className="absolute hover:text-[#6556CD] right-[5%] top-[10%] ri-close-fill z-[999]"> </Link>
     

      {ytvideo && (
      <iframe
        width="80%"
        height="80%"
        src={`https://www.youtube.com/embed/${ytvideo.key}?controls=1`}
        title="YouTube video player"
        allowFullScreen
      ></iframe>
    )  }
   </div>
  )

}

export default Video



 