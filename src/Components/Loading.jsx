 
// import loader from '/loading.gif'
// import loadingAnimation from '/loader.json';
 

// function Loading() {
//   return (
//     <div className='w-full h-screen flex justify-center bg-black items-center loading 
//      ' >
//       <img className='h-[50%]   object-cover' src={loadingAnimation} alt="" />
     
//     </div>
//   )
// }

// export default Loading



 




import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "/src/public/sandy.json";

function Loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-black">
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        autoplay={true}
        className="h-[50%] w-[50%]"
      />
    </div>
  );
}

export default Loading;
