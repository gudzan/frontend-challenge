import { AppState } from "./store"

export const selectCats = (state: AppState) => state.cat.items
export const selectFavourites = (state: AppState) => state.cat.favourites
export const selectCount = (state: AppState) => state.cat.totalCount

