 

import axios from '../../utils/Axios';
import { loadmovie } from "../reducers/movieSlice";
// export { removemovie } from "../reducers/movieSlice";

export const asyncloadmovie = (id) => async (dispatch, getState) => {
  try {
    // Sare API calls ek sath chalenge
    const [
      detail,
      externalid,
      recommendations,
      similar,
      translations,
      videos,
      watchproviders,
    ] = await Promise.all([
      axios.get(`/movie/${id}`),
      axios.get(`/movie/${id}/external_ids`),
      axios.get(`/movie/${id}/recommendations`),
      axios.get(`/movie/${id}/similar`),
      axios.get(`/movie/${id}/translations`),
      axios.get(`/movie/${id}/videos`),
      axios.get(`/movie/${id}/watch/providers`),
    ]);

    let theultimatedetails = {
      detail: detail.data,
      externalid: externalid.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      translations: translations.data.translations.map((t) => t.english_name),
      videos: videos.data.results.find((m) => m.type === "Trailer"),
      watchproviders: watchproviders.data.results?.IN, 
    };

    console.log(theultimatedetails.videos,"j");
    
    dispatch(loadmovie(theultimatedetails));
    console.log(theultimatedetails);

  } catch (err) {
    console.log("error", err.response?.status, err.response?.data || err.message);
  }
};

 