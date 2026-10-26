import { useParams, Link } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext.jsx';
import { useComparedProducts } from '../context/CompareContext';
import useFavorites from '../hooks/useFavorites';
import { useState, useEffect } from 'react';
import starStill from "../images/star_still.png";
import starEmpty from "../images/star_empty.png";

// brand esiste solo sulle console, publisher/developer/console solo sui videogiochi
const detailFields = [
    { key: "category", label: "Category" },
    { key: "brand", label: "Brand" },
    { key: "console", label: "Console" },
    { key: "publisher", label: "Publisher" },
    { key: "developer", label: "Developer" },
    { key: "release_date", label: "Release date", format: date => new Date(date).toLocaleDateString() },
    { key: "condition", label: "Condition" },
];

export default function DetailPage() {
    const { type, id } = useParams();
    const { fetchProduct } = useGlobalContext();
    const { isInFavorites, toggleFavorite } = useFavorites();
    const { toggleCompare, isInCompare } = useComparedProducts();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // type serve a preferiti e comparazione per riconoscere il prodotto
        fetchProduct(type, id).then(p => setProduct({ ...p, type })).catch(console.error)
    }, [type, id]);

    if (!product) return <p className="detail-loading">Loading...</p>;

    const backgroundStyle = product.image
        ? {
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)), url("${product.image}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }
        : undefined;

    return (
        <div className="detail-page">
            <Link to="/shop" className="detail-back-link">← Back to shop</Link>
            <div className="detail-container">
                <div className="detail-hero" style={backgroundStyle}>
                    <div className="prod-contentbox">
                        <h2>{product.title}</h2>
                        <div className="prod-footer">
                            <div className="prod-actions">
                                <button className={isInFavorites(product) ? "favorite-btn active" : "favorite-btn"} onClick={() => toggleFavorite(product)}>
                                    <img
                                        src={isInFavorites(product) ? starStill : starEmpty}
                                        alt={isInFavorites(product) ? "Remove from favorites" : "Add to favorites"}
                                    />
                                </button>
                                <button className={isInCompare(product) ? "compare-btn-card active" : "compare-btn-card"} onClick={(event) => toggleCompare(event, product)}>
                                    {isInCompare(product) ? "Remove" : "Compare"}
                                </button>
                            </div>
                            <div className="prod-tags">
                                {product.price && <span className="prod-tag prod-tag-price">${product.price}</span>}
                                {product.condition && <span className="prod-tag prod-tag-condition">{product.condition}</span>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="detail-info">
                    {product.description && <p className="detail-description">{product.description}</p>}
                    <dl className="detail-specs">
                        {detailFields
                            .filter(field => product[field.key])
                            .map(field => (
                                <div key={field.key} className="detail-spec">
                                    <dt>{field.label}</dt>
                                    <dd>{field.format ? field.format(product[field.key]) : product[field.key]}</dd>
                                </div>
                            ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}
