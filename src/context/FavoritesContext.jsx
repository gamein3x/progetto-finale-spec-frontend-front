import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]);

    const isSameProduct = (a, b) => a.id === b.id && a.type === b.type;

    const addToFavorites = (product) => {
        const alreadyExists = favorites.some(
            (item) => isSameProduct(item, product)
        );

        if (!alreadyExists) {
            setFavorites([...favorites, product]);
        }
    }

    const removeFromFavorites = (product) => {
        const updateFavorites = favorites.filter(
            (item) => !isSameProduct(item, product)
        );

        setFavorites(updateFavorites);
    }

    const isInFavorites = (product) => {
        return favorites.some((item) => isSameProduct(item, product)
        )
    };

    const toggleFavorite = (product) => {
        if (isInFavorites(product)) {
            removeFromFavorites(product);
        } else {
            addToFavorites(product);
        }
    };

    return (
        <FavoritesContext
            value={{
                favorites,
                addToFavorites,
                removeFromFavorites,
                isInFavorites,
                toggleFavorite,
            }}
        >
            {children}
        </FavoritesContext>
    );

}

function useFavorites() {
    return useContext(FavoritesContext);
};

export {
    FavoritesContext,
    FavoritesProvider,
    useFavorites
};