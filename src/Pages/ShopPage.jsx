import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext.jsx';

import HomeProductCard from '../components/HomeProductCard.jsx';
import Modal from '../components/Modal.jsx';
import useStorage from '../hooks/useStorage.js';

export default function ShopPage() {
    const { products } = useGlobalContext();

    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [productsToCompare, setProductsToCompare] = useState([]);


    const [searchParams] = useSearchParams();
    const search = (searchParams.get("search") || "").toLowerCase();

    const sortIcon = sortOrder === 1 ? "↓" : "↑";

    const isSameProduct = (a, b) => a.id === b.id && a.type === b.type;
    const isInCompare = (product) => productsToCompare.some(p => isSameProduct(p, product));

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

    const toggleCompare = (event, product) => {
        event.preventDefault();
        if (isInCompare(product)) {
            setProductsToCompare(prev => prev.filter(p => !isSameProduct(p, product)));
        } else {
            if (productsToCompare.length < 3) {
                setProductsToCompare(prev => [...prev, product]);
                if (productsToCompare.length === 0) {setShowModal(true)};
            } else {
                alert("You reached product limit.");
            }
        }
    }

    return (
        <main>
            <button onClick={() => handleSort("title")} >A{sortIcon}</button>
            {filteredProducts.map(product => (
                <Link key={`${product.type}-${product.id}`} to={`/products/${product.type}/${product.id}`}>
                    <HomeProductCard product={product} />
                    <button onClick={(e) => toggleCompare(e, product)}>
                        {isInCompare(product) ? "Remove" : "Compare"}
                    </button>
                </Link>
            ))}
            <Modal
                content={productsToCompare.map(product => (
                <div key={`${product.type}-${product.id}`}>
                    <p>{product.title}</p>
                </div>))}
                show={showModal}
                onClose={() => setShowModal(false)}
            />
        </main>
    );
}