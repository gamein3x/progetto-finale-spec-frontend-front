import { useState, useMemo, useCallback, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext.jsx';

import HomeProductCard from '../components/HomeProductCard.jsx';

const normalize = str => (str || "").toLowerCase().replace(/\s+/g, "");

// filtri che includono tutti i tipi di prodotto (console e videogiochi)
const brandFilters = {
    nintendo: { label: "Nintendo", match: p => [p.brand, p.publisher, p.console].some(f => normalize(f).includes("nintendo")) },
    playstation: { label: "Playstation", match: p => normalize(p.brand).includes("sony") || normalize(p.console).includes("playstation") },
    gameboy: { label: "Gameboy", match: p => [p.console, p.title].some(f => normalize(f).includes("gameboy")) },
};

const categories = ["Videogames", "Consoles"];

export default function ShopPage() {
    const { products, fetchProduct, fetchCategoryKeys } = useGlobalContext();

    const [sortBy, setSortBy] = useState("title");
    const [sortOrder, setSortOrder] = useState(1);
    const [resultsNumber, setResultsNumber] = useState(0);
    const [category, setCategory] = useState(null);
    const [categoryKeys, setCategoryKeys] = useState(null);
    const [brandFilter, setBrandFilter] = useState(null);
    // per non caricare in localStorage, aggiungo bottone per accesso in ogni lato dell'app più avanti

    const [searchParams] = useSearchParams();
    const search = (searchParams.get("search") || "").toLowerCase();
    const normalizedSearch = normalize(search);

    const sortIcon = sortOrder === 1 ? "Z↓" : "A↑";

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(prev => prev * -1);
        } else {
            setSortBy(field);
            setSortOrder(1);
        }
    };

    useEffect(() => {
        if (!category) {
            setCategoryKeys(null);
            return;
        }
        let ignore = false; // evita di applicare una risposta vecchia se si cambia categoria velocemente
        fetchCategoryKeys(category)
            .then(keys => { if (!ignore) setCategoryKeys(new Set(keys)); })
            .catch(console.error);
        return () => { ignore = true; };
    }, [category]);

    const filteredProducts = useMemo(() =>
        products
            .filter(p => !categoryKeys || categoryKeys.has(`${p.type}-${p.id}`))
            .filter(p => !brandFilter || brandFilters[brandFilter].match(p))
            // brand esiste solo sulle console, publisher e console solo sui videogiochi
            .filter(p => [p.title, p.category, p.brand, p.publisher, p.console]
                .some(field => normalize(field).includes(normalizedSearch)))
            .sort((a, b) => {
                let comparison;
                if (sortBy === "title") {
                    comparison = a.title.localeCompare(b.title);
                }
                return comparison * sortOrder;
            }),
        [products, sortBy, sortOrder, normalizedSearch, categoryKeys, brandFilter]);

    const fullSearchResults = filteredProducts.map(product => (
        <HomeProductCard product={product} key={`${product.type}-${product.id}`} />
    ));

    return (
        <div className='shop-page-container'>
            <div className="filters-container">
                <button onClick={() => handleSort("title")} >{sortIcon}</button>
                {categories.map(cat => (
                    <button key={cat}
                        className={category === cat ? "active" : ""}
                        onClick={() => setCategory(prev => prev === cat ? null : cat)}>
                        {cat}
                    </button>
                ))}
                {Object.entries(brandFilters).map(([key, filter]) => (
                    <button key={key}
                        className={brandFilter === key ? "active" : ""}
                        onClick={() => setBrandFilter(prev => prev === key ? null : key)}>
                        {filter.label}
                    </button>
                ))}
            </div>
            <div className="product-results-container">
                    {filteredProducts.length === 0 ? "Nessun risultato trovato" : fullSearchResults}
            </div>
        </div>
    );
}