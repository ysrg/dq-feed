import { createSlice } from '@reduxjs/toolkit';

export const cardListSlice = createSlice({
  name: 'cardList',
  initialState: {
    favList: [],
    fullCardList: [],
  },
  reducers: {
    add: (state, action) => {
      state.favList.push(action.payload)
    },
    remove: (state, action) => {
      state.favList = state.favList.filter(i => i.id !== action.payload.id)
    },
    fill: (state, action) => {
      state.fullCardList = state.backup = action.payload
    },
    addToFullList: (state, action) => {
      state.fullCardList.push(action.payload)
    },
    removeMainListItems: (state, action) => {
      const mainCard = state.fullCardList[0]; // main card should be visible still
      const substr = action.payload.toLowerCase();
      const searchResults = state.backup.filter((item) => {
        return item.headline?.toLowerCase().includes(substr)
          || item.summary?.toLowerCase().includes(substr)
      })
      state.fullCardList = [mainCard, ...searchResults]

    },
  },
});

export const { add, remove, fill, removeMainListItems, addToFullList } = cardListSlice.actions;

export const selectCards = state => {
  return state.cardListFavs.favList;
}
export const cardList = state => {
  return state.cardListFavs.fullCardList;
}

export default cardListSlice.reducer;
