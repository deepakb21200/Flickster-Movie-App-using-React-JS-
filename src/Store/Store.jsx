import { configureStore } from '@reduxjs/toolkit'
import   movieSlice   from './reducers/movieSlice'
// import   tvSlice   from './reducers/tvSlice'
import   personSlice   from './reducers/personSlice'
import  tvSlice  from './reducers/tvSlice'
 
import   seasonSlice   from './reducers/seasonSlice'
export const store = configureStore({
  reducer: {
    movie:movieSlice,
    tv:tvSlice, 
    person:personSlice,
    season:seasonSlice 
  },
})