import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext.jsx';
import HomeProductCard from '../components/HomeProductCard.jsx';

export default function ShopPage() {
    const { products } = useGlobalContext();
    const [searchParams] = useSearchParams();
    const search = (searchParams.get("search") || "").toLowerCase();

    const filteredProducts = useMemo(() =>
        products.filter(p =>
            p.title.toLowerCase().includes(search) ||
            p.category.toLowerCase().includes(search)),
        [products, search]);

    return (
        <main>
            {filteredProducts.map(product => (
                <HomeProductCard key={`${product.category}-${product.id}`} product={product} />
            ))}
        </main>
    );
}