import axios from "../../utils/Axios";
import { loadSeason } from "../reducers/seasonSlice"; // 👈 ye alag slice banana hoga (season ke liye)

export const asyncloadseason = (tv_id, season_number) => async (dispatch, getState) => {


   try {

    // const [
    //   olddetail,
    //   detail2,
    //   aggregateCredits,
    //   credits,
    //   externalids,
    //   images2,
    //   translations2,
    //   videos2,
    // ] = await Promise.all([
    //   axios.get(`/tv/${tv_id}`),
    //   axios.get(`/tv/${tv_id}/season/${season_number}`), 
    //   axios.get(`/tv/${tv_id}/season/${season_number}/aggregate_credits`), 
    //   axios.get(`/tv/${tv_id}/season/${season_number}/credits`), 
    //   axios.get(`/tv/${tv_id}/season/${season_number}/external_ids`),
    //   axios.get(`/tv/${tv_id}/season/${season_number}/images`), 
    //   axios.get(`/tv/${tv_id}/season/${season_number}/translations`), 
    //   axios.get(`/tv/${tv_id}/season/${season_number}/videos`),     
    // ]);

    // // Final combined object
    // let seasonDetails = {
    //   olddetail:olddetail.data,
    //   detail2: detail2.data, // season basic info + episodes
    //   aggregateCredits: aggregateCredits.data,
    //   credits: credits.data,
    //   externalids: externalids.data,
    //   images2: images2.data,
    //   translations2: translations2.data.translations?.map((t) => t.english_name), // safe map
    //   videos2: videos2.data,
    // }

    // Redux me dispatch
    // dispatch(loadSeason(seasonDetails));
    // console.log("Season Details: ", seasonDetails);

    const [
   
      videos,
      tries,
      images
    ] = await Promise.all([
     
      axios.get(`/tv/${tv_id}/season/${season_number}/videos`),
      axios.get(`/tv/${tv_id}/season/${season_number}`),
       axios.get(`/tv/${tv_id}/season/${season_number}/images`),
    ]);

    let theultimatedetails = {
      images: images.data,
      tries:tries.data,
      videos:videos.data.results.find((m) => m.type === "Trailer"),
    };

    console.log("images: images.data", theultimatedetails);

    
    dispatch(loadSeason(theultimatedetails));
    

  } catch (err) {
    console.log("error", err);
  }
};
