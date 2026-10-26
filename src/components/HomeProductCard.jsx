import { useComparedProducts } from "../context/CompareContext";
import { Link } from "react-router-dom";
import useFavorites from "../hooks/useFavorites";
import starStill from "../images/star_still.png";
import starEmpty from "../images/star_empty.png";

export default function HomeProductCard({ product }) {
    const { isInFavorites, toggleFavorite } = useFavorites();
    const { toggleCompare, isInCompare } = useComparedProducts();

    const backgroundStyle = product.image
        ? {
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)), url("${product.image}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }
        : undefined;

    return <Link
        key={`${product.type}-${product.id}`}
        to={`/products/${product.type}/${product.id}`}
        className='product-card'
        style={backgroundStyle}>
        <div className="prod-contentbox">
            <h2>{product.title}</h2>
            <div className="prod-footer">
                <div className="prod-actions">
                    <button className={isInFavorites(product) ? "favorite-btn active" : "favorite-btn"} onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        toggleFavorite(product);
                    }}>
                        <img
                            src={isInFavorites(product) ? starStill : starEmpty}
                            alt={isInFavorites(product) ? "Remove from favorites" : "Add to favorites"}
                        />
                    </button>
                    <button className={isInCompare(product) ? "compare-btn-card active" : "compare-btn-card"} onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        toggleCompare(event, product)}}>
                        {isInCompare(product) ? "Remove" : "Compare"}
                    </button>
                </div>
                <div className="prod-tags">
                    {product.price && <span className="prod-tag prod-tag-price">${product.price}</span>}
                    {product.condition && <span className="prod-tag prod-tag-condition">{product.condition}</span>}
                </div>
            </div>
        </div>
    </Link>
}