 
// import { Link } from 'react-router-dom'
  import noimage from '/picture.png'
 
// export default function Cards({ data, title }) {

 
//    let optimizedImage = (url) =>{
//   return `https://res.cloudinary.com/dcb3u3vy8/image/fetch/${url}`}
  
//   return (

// <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
//     gap-8 mt-[30px] place-items-center p-[20px] md:p-[20px]   '>
//   {data.map((cards, index) => (
//     <Link
//       to={`/${cards.media_type || title}/details/${cards.id}`}
//       key={`${cards.id}-${index}`} 
//       className='relative cursor-pointer rounded-xl w-full overflow-hidden border h-[40vh]'
//     >
//       {/* Card Image */}
//       <img
//         className='h-full w-full object-cover rounded-xl transition-transform duration-300 ease-in-out
//                    group-hover:scale-105'
//         src={
//           cards.poster_path || cards.backdrop_path || cards.profile_path
//             ? optimizedImage(`https://image.tmdb.org/t/p/original${cards.poster_path || cards.backdrop_path || cards.profile_path}`)
//             : noimage
//         } loading="lazy" 
//         alt={cards.title || cards.name || 'No Image'}
//       />

//       {/* Overlay */}
 
//       <div className='absolute inset-0 bg-black bg-opacity-60 opacity-0 hover:opacity-100 transition-opacity duration-300
//                 flex flex-col justify-center items-center text-center p-4'>

//   <i className='ri-play-line text-4xl text-white mb-2'></i>


//   <h1 className='text-lg text-white font-semibold text-center break-words'>
//     {cards.title || cards.name || cards.original_name || "N.A"}
//   </h1>
// </div>

//     </Link>
//   ))}
// </div>

 

//   )
// }















// import React from 'react';
// import { Link } from 'react-router-dom';




// function Cards({ data , title }) {
    
    

//    let optimizedImage = (url) =>{
//    return `https://res.cloudinary.com/dcb3u3vy8/image/fetch/${url}`}
  
//     return (
//         <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
//      gap-8 mt-[30px] place-items-center p-[20px] md:p-[20px] h-auto '>
//             {data.map((cards, index) => (
//                 <Link to={`/${cards.media_type || title}/details/${cards.id}`}
//                     className='w-[35vh] mr-[3.5%] mb-[1%] mt-[2%] transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:bg-gray-800 rounded-lg'
      
//                     key={`${index}`} 
//                 >
//                     <div className='relative bg-gray-900 rounded-lg shadow-md overflow-hidden'>
//                         <img
//                             className='h-[40vh] w-full  object-fill rounded-t-lg'
  
//                                  src={
//         cards.poster_path || cards.backdrop_path || cards.profile_path
//              ? optimizedImage(`https://image.tmdb.org/t/p/original${cards.poster_path || cards.backdrop_path || cards.profile_path}`)
//             : noimage
//       }
//                             alt={cards.original_title || cards.title || cards.name || cards.original_name}
//                         />
//                         <h1 className='text-lg text-zinc-300 mt-1 font-semibold truncate px-3 py-2'>{cards.original_title || cards.title || cards.name || cards.original_name}</h1>
//                     </div>
//                 </Link>
//             ))}
//         </div>
//     );
// }

// export default Cards;









// import React from 'react';
// import { Link } from 'react-router-dom';

// function Cards({ data , title }) {
//     return (
//         <div className='flex flex-wrap w-full h-auto justify-evenly'>
//             {data.map((cards, index) => (
//                 <Link to={`/${cards.media_type || title}/details/${cards.id}`}
//                     className='w-[35vh] mr-[3.5%] mb-[1%] mt-[2%] transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:bg-gray-800 rounded-lg'
//                     key={index}
//                 >
//                     <div className='relative bg-gray-900 rounded-lg shadow-md overflow-hidden'>
//                         <img
//                             className='h-[40vh] w-full  object-fill rounded-t-lg'
//                             src={`https://image.tmdb.org/t/p/original/${cards.poster_path || cards.backdrop_path || cards.profile_path}`}
//                             alt={cards.original_title || cards.title || cards.name || cards.original_name}
//                         />
//                         <h1 className='text-lg text-zinc-300 mt-1 font-semibold truncate px-3 py-2'>{cards.original_title || cards.title || cards.name || cards.original_name}</h1>
//                     </div>
//                 </Link>
//             ))}
//         </div>
//     );
// }

// export default Cards; //this is good ye use karn h














// function Cards({ data , title }) {
//   let optimizedImage = (url) => {
//     return `https://res.cloudinary.com/dcb3u3vy8/image/fetch/${url}`;
//   };

//   return (
//     <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
//       gap-8 mt-[30px] place-items-center p-[20px] md:p-[20px] overflow-hidden'>
   
//       {data.map((cards, index) => (
//         <Link 
//           to={`/${cards.media_type || title}/details/${cards.id}`}
//           key={`${cards.id}-${index}`} 
      
//           className='group w-[35vh] transition-all duration-300 transform hover:scale-[1.02]'
//         >
//           <div className='relative bg-zinc-900 rounded-xl shadow-md overflow-hidden 
//                           border border-zinc-800 hover:border-[#DD4343]/70 
//                           transition-all duration-300'>
            
//             {/* Poster Image */}
//             <img
//               className='h-[40vh] w-full object-cover rounded-t-xl 
//                          transition-transform duration-500 ease-in-out group-hover:scale-105'
//               src={
//                 cards.poster_path || cards.backdrop_path || cards.profile_path
//                   ? optimizedImage(`https://image.tmdb.org/t/p/original${cards.poster_path || cards.backdrop_path || cards.profile_path}`)
//                   : noimage
//               }
//               alt={cards.original_title || cards.title || cards.name || cards.original_name}
//               loading="lazy"
//             />

//             {/* Title Section */}
//             <div className='p-3'>
//               <h1 className='text-lg text-zinc-200 font-semibold truncate 
//                              group-hover:text-[#DD4343] transition-colors duration-300'>
//                 {cards.original_title || cards.title || cards.name || cards.original_name}
//               </h1>
//               {/* Optional extra info (like year or media type) */}
//               {cards.release_date && (
//                 <p className='text-sm text-zinc-500 mt-1'>
//                   {new Date(cards.release_date).getFullYear()}
//                 </p>
//               )}
//             </div>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// }

// export default Cards;























import React from 'react';
import { Link } from 'react-router-dom';

function Cards({ data , title }) {


    let optimizedImage = (url) =>{
    return `https://res.cloudinary.com/dcb3u3vy8/image/fetch/${url}`}
  
    return (
        <div className='flex flex-wrap w-full h-auto justify-evenly '>
            {data.map((cards, index) => (
                <Link to={`/${cards.media_type || title}/details/${cards.id}`}
                    className='w-[35vh]  mb-[2%] mt-[2%] transition-all duration-300 transform hover:scale-105 hover:shadow-lg rounded-lg'
                    key={index}
                >
                    <div className='relative bg-gray-900 rounded-lg shadow-md overflow-hidden'>
                        <img
                            className='h-[40vh] w-full object-fill rounded-t-lg'


                            // src={`https://image.tmdb.org/t/p/original/${cards.poster_path || cards.backdrop_path || cards.profile_path}`}
                            // alt={cards.original_title || cards.title || cards.name || cards.original_name}

                            


            src={cards.poster_path || cards.backdrop_path || cards.profile_path
               ? optimizedImage(`https://image.tmdb.org/t/p/original${cards.poster_path || cards.backdrop_path || cards.profile_path}`)
             : noimage}
                        />
                        
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








 