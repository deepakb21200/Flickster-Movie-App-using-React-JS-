 return trending.length > 0 ?  (
      <div className='w-full xl:px-[30px]  '>
     
        <div className='w-full flex items-center  justify-between my-[5px]   flex-wrap  pl-[30px] xl:pl-[0px]'>
          <h1 className='text-2xl font-semibold text-zinc-400'>

          <i onClick={()=>Navigate(-1)} className="ri-arrow-left-line p-3 text-2xl hover:text-[#DD4343]"></i>
            Trending <small className='ml-1 text-lg text-zinc-500'>{category},{duration}</small> 
          </h1>
               <Navbar/>
          <div className='flex justify-between   items-center'>
            <div className='flex '>
               <Dropdown title="Category" options={["movie", "tv", "all"]} func={(e) => setcategory(e.target.value)} 
                value={category} />
         
            <Dropdown title="Duration" options={["week", "day"]} func={(e) => setduration(e.target.value)} 
                value={duration} />
            </div>
          

          </div>
        </div>

        <InfiniteScroll
          dataLength={trending.length}
            next={GetTrending}
              // style={{overflow:"visible"}}
                hasMore={hasMore && !error}   // error aaya to aur data fetch mat karo
          //  loader={!error && <Search />}
             loader={!error && (
  <div className="h-16 flex items-center justify-center">
    <p className="text-zinc-400 text-lg">Loading movies...</p>
  </div>
)}
          className='w-full'
          
            
        >
          <Cards data={trending} title="tv" />
        </InfiniteScroll>


           {error && (
  <p className="flex items-center justify-center gap-2 text-red-500 text-lg font-semibold ">
    <i className="ri-error-warning-line text-5xl "></i>
    Something went wrong, please try again!
  </p>
)}
      </div>
    ) : <Loading />
