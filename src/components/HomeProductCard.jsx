import { useComparedProducts } from "../context/CompareContext";
import { Link } from "react-router-dom";
import useFavorites from "../hooks/useFavorites";

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
            <p>{product.category}</p>
            <button onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                toggleFavorite(product);
            }}>
                {isInFavorites(product) ? "<3" : "</3"}
            </button>
            <button onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                toggleCompare(event, product)}}>
                {isInCompare(product) ? "Remove" : "Compare"}
            </button>
        </div>
    </Link>
}