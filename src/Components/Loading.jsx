 
import loader from '/loading.gif'

function Loading() {
  return (
    <div className='w-full h-screen flex justify-center bg-black items-center loading 
     ' >
      <img className='h-[50%]   object-cover' src={loader} alt="" />
    </div>
  )
}

export default Loading