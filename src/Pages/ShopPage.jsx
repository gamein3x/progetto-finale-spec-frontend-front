import { useState, useMemo, useCallback, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext.jsx';
import { useComparedProducts } from '../context/CompareContext.jsx';

import HomeProductCard from '../components/HomeProductCard.jsx';
import Modal from '../components/Modal.jsx';
import useStorage from '../hooks/useStorage.js';

export default function ShopPage() {
    const { products, fetchProduct } = useGlobalContext();

    const {productsToCompare, toggleCompare, isInCompare } = useComparedProducts();

    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState(1);
    const [resultsNumber, setResultsNumber] = useState(0);
    const [showModal, setShowModal] = useState(false);
    // per non caricare in localStorage, aggiungo bottone per accesso in ogni lato dell'app più avanti

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

    useEffect(() => {
        if (productsToCompare.length > 1) setShowModal(true);
    }, [productsToCompare]);
    
    const fullSearchResults = filteredProducts.map(product => (
        <Link key={`${product.type}-${product.id}`} to={`/products/${product.type}/${product.id}`} className='product-card'>
            <HomeProductCard product={product} />
            <button onClick={(e) => toggleCompare(e, product)}>
                {isInCompare(product) ? "Remove" : "Compare"}
            </button>
        </Link>
    ));

    return (
        <div className='shop-page-container'>
            <button onClick={() => handleSort("title")} >{sortIcon}</button>
            <div className="product-results-container">
                {filteredProducts.length === 0 ? "Nessun risultato trovato" : fullSearchResults}
            </div>
            <Modal
                content={productsToCompare.map(product => (<div key={`${product.type}-${product.id}`}
                    className='compare-card'>
                    <h5>{product.title}</h5>
                    <p>{product.description}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Price</th>
                                <th>Condition</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><p>{product.price}</p></td>
                                <td><p>{product.condition}</p></td>
                            </tr>
                        </tbody>
                    </table>
                </div>))}
                show={showModal}
                onClose={() => setShowModal(false)}
            />
        </div>
    );
}