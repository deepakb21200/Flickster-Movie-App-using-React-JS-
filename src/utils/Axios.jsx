  import axios from "axios";

  const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
      accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NWRjYWY5ZjgyYzEwNmZjNjNmNTViYTdmMGRmOThhMCIsIm5iZiI6MTc1MzE2MTUzMC41NDcwMDAyLCJzdWIiOiI2ODdmMWYzYTUwOTE1YTc0NGUyNDRlNGQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.omdTbXGcyQFJMQ06nyb5BrO5sgsRkPfUmNI3dQNlaPg',

   
  },
    
})
export default instance