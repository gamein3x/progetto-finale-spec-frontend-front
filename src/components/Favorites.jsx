import useFavorites from "../hooks/useFavorites";
import HomeProductCard from "./HomeProductCard";

export default function Favorites() {
    const { favorites } = useFavorites()

    return <>
        {favorites.length === 0 && <div>
            <h6>No favorites saved yet</h6>
            </div>}
        {favorites.map((favorites) => (
            <HomeProductCard key={`${favorites.type}-${favorites.id}`} product={favorites}/>
        ))}
    </>
};

