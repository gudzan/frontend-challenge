import { Cat } from "../types/Cat";

const FAVOURITES_KEY = "favourites"

export const getFavourites = () => {
  return localStorage.getItem(FAVOURITES_KEY)
}

export const addFavourites = (newCat: Cat) => {
  const existingCats: Cat[] = JSON.parse(getFavourites() || '[]');
  existingCats.push(newCat);
  localStorage.setItem(FAVOURITES_KEY, JSON.stringify(existingCats));
}

export const removedFavourites = (catId: string): void => {
  const existingCats: Cat[] = JSON.parse(getFavourites() || '[]');
  if (existingCats.length !== 0) {
    const updatedFavourites = existingCats.filter((cat: { id: string }) => cat.id !== catId);
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify(updatedFavourites));
  }
}