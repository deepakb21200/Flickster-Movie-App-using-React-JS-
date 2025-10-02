import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};

const seasonSlice = createSlice({
  name: "season",
  initialState,
  reducers: {
    loadSeason: (state, action) => {
      state.info = action.payload;
    },
    removeloadSeason: (state, action) => {
      state.info = null
    }
  },
});

export const { loadSeason ,removeloadSeason} = seasonSlice.actions;
export default seasonSlice.reducer;
