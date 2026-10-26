import { useState } from "react";
import useFavorites from "../hooks/useFavorites";
import HomeProductCard from "./HomeProductCard";

export default function Favorites({ panelRef }) {
    const { favorites } = useFavorites()
    // copia presa al mount: i preferiti rimossi restano visibili finché il pannello non viene riaperto
    const [shownFavorites] = useState(favorites);

    return <div className="favorites-panel" ref={panelRef}>
        {shownFavorites.length === 0 && <div>
            <h6 className="empty-favorites-text">No favorites saved yet !!</h6>
            </div>}
        <div className="favorites-track">
            {shownFavorites.map((favorite) => (
                <HomeProductCard key={`${favorite.type}-${favorite.id}`} product={favorite}/>
            ))}
        </div>
    </div>
};

