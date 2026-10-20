import useFavorites from "../hooks/useFavorites";

export default function HomeProductCard({ product }) {
    const { isInFavorites, toggleFavorite } = useFavorites();

    return <>
                <h2>{product.title}</h2>
                <p>{product.category}</p>
                <button onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    toggleFavorite(product);
                }}>
                    {isInFavorites(product) ? "<3" : "</3"}
                </button>
            </>
}