import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cat } from "../types/Cat";
import { getFavourites, removedFavourites, addFavourites } from "../utils/localStorage";

export type catSliceType = {
  items: Cat[];
  favourites: Cat[];
  totalCount: number,
};

const storedCats = getFavourites()
const initialState: catSliceType = {
  items: [],
  favourites: storedCats ? JSON.parse(storedCats) : [],
  totalCount: 10_000, //в запросе нет информации об общем кол-ве котов. В документации указано, что их как минимум 60 000, думаю 10 000 будет достаточно.
};

export const catSlice = createSlice({
  name: "cat",
  initialState,
  reducers: {
    catsReceved: (state, action: PayloadAction<Cat[]>) => {
      const favoriteIds = state.favourites.map(cat => cat.id);
      state.items = action.payload.map(cat => ({
        ...cat,
        favorite: favoriteIds.includes(cat.id),
      }));
    },
    favouritesAdd: (state, action: PayloadAction<Cat>) => {
      const existingFavorite = state.favourites.find(cat => cat.id === action.payload.id);
      if (!existingFavorite) {
        const catInItems = state.items.find(cat => cat.id === action.payload.id);
        if (!catInItems) {
          return
        }
        catInItems.favorite = true;
        addFavourites(catInItems)
        state.favourites.push(catInItems)
      }
    },
    favouritesRemove: (state, action: PayloadAction<string>) => {
      removedFavourites(action.payload)
      state.favourites = state.favourites.filter(cat => cat.id !== action.payload);
      const catInItems = state.items.find(cat => cat.id === action.payload);
      if (catInItems) {
        catInItems.favorite = false;
      }
    },
  },
});

export const catRequested = createAction("cat/requested");
export const catRequestFailed = createAction("cat/requestFailed");

const { actions, reducer: catsReduser } = catSlice;
export const { catsReceved, favouritesAdd, favouritesRemove } = actions;

export default catsReduser;
