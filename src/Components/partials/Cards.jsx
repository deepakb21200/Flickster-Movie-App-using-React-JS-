import noimage from '/picture.png'

import { Link } from 'react-router-dom';

function Cards({ data , title }) {


    let optimizedImage = (url) =>{
    return `https://res.cloudinary.com/dcb3u3vy8/image/fetch/${url}`}
  
    return (
        <div className='flex flex-wrap w-full h-auto justify-evenly px-[20px] md:px-[0px]  '>
            {data.map((cards, index) => (
                <Link to={`/${cards.media_type || title}/details/${cards.id}`}
                    // className='md:w-[35vh] w-[30vh] md mb-[2%] mt-[2%] transition-all duration-300 transform hover:scale-105 hover:shadow-lg rounded-lg'
                      className='md:w-[320px] w-[30vh] md mb-[2%] mt-[2%] transition-all duration-300 transform hover:scale-105 hover:shadow-lg rounded-lg'
                    key={index}>

          <div className='relative bg-gray-900 rounded-lg shadow-md overflow-hidden'>
                        <img  className='h-[40vh] w-full object-fill rounded-t-lg'
                           src={cards.poster_path || cards.backdrop_path || cards.profile_path
               ? optimizedImage(`https://image.tmdb.org/t/p/original${cards.poster_path || cards.backdrop_path || cards.profile_path}`)
             : noimage} />
                        
                        {/* Overlay */}
                        <div className='absolute inset-0 bg-black bg-opacity-60 opacity-0 hover:opacity-100 transition-opacity duration-300
                                        flex flex-col justify-center items-center text-center p-4'>
                            <i className='ri-play-line text-4xl text-white mb-2'></i>
                        </div>

                        <h1 className='text-lg text-zinc-300 mt-1 font-semibold truncate px-3 py-2'>
                            {cards.original_title || cards.title || cards.name || cards.original_name}
                        </h1>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Cards;








 