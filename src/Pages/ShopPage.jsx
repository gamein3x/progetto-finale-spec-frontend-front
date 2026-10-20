import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext.jsx';
import HomeProductCard from '../components/HomeProductCard.jsx';

export default function ShopPage() {
    const { products } = useGlobalContext();

    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState(1);

    const [searchParams] = useSearchParams();
    const search = (searchParams.get("search") || "").toLowerCase();

    const sortIcon = sortOrder === 1 ? "↓" : "↑";

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(prev => prev * -1);
        } else {
            setSortBy(field);
            setSortOrder(1);
        }
    };

    const filteredProducts = useMemo(() =>
        products.filter(p =>
            p.title.toLowerCase().includes(search) ||
            p.category.toLowerCase().includes(search))
            .sort((a, b) => {
                let comparison;
                if (sortBy === "title") {
                    comparison = a.title.localeCompare(b.title);
                } else if (sortBy === "createdAt") {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);
                    comparison = dateA - dateB;
                }

                return comparison * sortOrder;
            }),
        [products, sortBy, sortOrder, search]);

    return (
        <main>
            <button onClick={() => handleSort("title")} >A{sortIcon}</button>
            {filteredProducts.map(product => (
                <Link key={`${product.type}-${product.id}`} to={`/products/${product.type}/${product.id}`}>
                    <HomeProductCard product={product} />
                </Link>
            ))}
        </main>
    );
}