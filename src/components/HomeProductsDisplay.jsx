import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext.jsx';

import HomeProductCard from './HomeProductCard.jsx';

function getRandomItems(array, count) {
    // Fisher-Yates shuffle su una copia, poi prendo i primi "count"
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, count);
}

export default function HomeProductsDisplay() {
    const { products } = useGlobalContext();

    // ricalcolato solo quando arrivano i prodotti, non ad ogni render

    const randomVideogames = useMemo(() =>
        getRandomItems(products.filter(p => p.type === "videogame"), 3),
        [products]);

    return (<div className='home-products-display'>
        <h1>Rediscover old gems...</h1>
        <div className="home-products-container">
            {randomVideogames.map(product => (
                <Link
                    key={`${product.type}-${product.id}`}
                    to={`/products/${product.type}/${product.id}`}
                    className='product-card'>
                    <HomeProductCard product={product} />
                </Link>
            ))}
        </div>
    </div>
    );
}