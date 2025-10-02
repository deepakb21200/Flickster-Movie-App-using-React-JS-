 
import { Link } from 'react-router-dom'
import noimage from '/picture.png'
 
export default function Cards({ data, title }) {

 
   let optimizedImage = (url) =>{
  return `https://res.cloudinary.com/dcb3u3vy8/image/fetch/${url}`}
  
  return (

<div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
    gap-8 mt-[30px] place-items-center p-[20px] md:p-[20px]   '>
  {data.map((cards, index) => (
    <Link
      to={`/${cards.media_type || title}/details/${cards.id}`}
      key={`${cards.id}-${index}`} 
      className='relative cursor-pointer rounded-xl w-full overflow-hidden border'
    >
      {/* Card Image */}
      <img
        className='h-[40vh] w-full object-cover rounded-xl transition-transform duration-300 ease-in-out
                   group-hover:scale-105'
        src={
          cards.poster_path || cards.backdrop_path || cards.profile_path
            ? optimizedImage(`https://image.tmdb.org/t/p/original${cards.poster_path || cards.backdrop_path || cards.profile_path}`)
            : noimage
        }
        alt={cards.title || cards.name || 'No Image'}
      />

      {/* Overlay */}
 
      <div className='absolute inset-0 bg-black bg-opacity-60 opacity-0 hover:opacity-100 transition-opacity duration-300
                flex flex-col justify-center items-center text-center p-4'>

  <i className='ri-play-line text-4xl text-white mb-2'></i>


  <h1 className='text-lg text-white font-semibold text-center break-words'>
    {cards.title || cards.name || cards.original_name || "N.A"}
  </h1>
</div>

    </Link>
  ))}
</div>

 

  )
}
