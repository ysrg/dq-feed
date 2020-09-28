import { configureStore } from "@reduxjs/toolkit";
import cardListReducer from "../features/card/cardListSlice";

export default configureStore({
  reducer: {
    cardListFavs: cardListReducer,
  },
});
