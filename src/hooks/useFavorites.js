import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

function useFavorites() {
    const favoriteValues = useContext(FavoritesContext);

    if (!favoriteValues) {
        throw new Error("You forgot to set FavoritesProvider!");
    }

    return favoriteValues;
}

export default useFavorites;