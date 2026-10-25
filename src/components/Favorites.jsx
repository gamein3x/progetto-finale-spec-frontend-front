import useFavorites from "../hooks/useFavorites";
import HomeProductCard from "./HomeProductCard";

export default function Favorites() {
    const { favorites } = useFavorites()

    return <div className="favorites-panel">
        {favorites.length === 0 && <div>
            <h6>No favorites saved yet</h6>
            </div>}
        <div className="favorites-track">
            {favorites.map((favorite) => (
                <HomeProductCard key={`${favorite.type}-${favorite.id}`} product={favorite}/>
            ))}
        </div>
    </div>
};

