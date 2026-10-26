import { useState, useEffect, useCallback, useRef } from 'react';
import { NavLink, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import useFavorites from '../hooks/useFavorites';
import { useComparedProducts } from '../context/CompareContext';
import Favorites from './Favorites';
import Modal from './Modal';
import CompareProducts from './CompareProducts';

import buttonImg from '../images/button_img.png';
import starStill from '../images/star_still.png';
import starSpinning from '../images/star_spinning.gif';
import compareStill from '../images/compare_still.png';
import compareActive from '../images/compare_active.png';

const debounce = (callback, delay) => {
    let timeout;
    return (value) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            callback(value);
        }, delay);
    }
};


export default function Header() {

    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const { favorites } = useFavorites();
    const { productsToCompare } = useComparedProducts();

    const isShopPage = location.pathname === "/shop";

    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
    const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
    const [isCompareOpen, setIsCompareOpen] = useState(false);

    useEffect(() => {
        if (isShopPage) setSearchQuery(searchParams.get("search") || "");
    }, [isShopPage, searchParams]);

    const debouncedGoToShop = useCallback(
        debounce(term => {
            navigate(term ? `/shop?search=${encodeURIComponent(term)}` : "/shop", { replace: true });
        }, 500),
        [navigate]
    );

    const handleChange = e => {
        const value = e.target.value;
        setSearchQuery(value);
        if (isShopPage) debouncedGoToShop(value, true); // live results only on the shop page
    };

    const handleSubmit = e => {
        e.preventDefault();
        const term = searchQuery.trim();
        navigate(term ? `/shop?search=${encodeURIComponent(term)}` : "/shop");
    };

    const SPIN_DURATION = 800;

    const [isSpinning, setIsSpinning] = useState(false);
    const [spinKey, setSpinKey] = useState(0);
    const prevFavCount = useRef(favorites.length);
    const spinTimer = useRef(null);
    const compareIcon = productsToCompare.length >= 2 ? compareActive : compareStill;

    useEffect(() => {
        if (favorites.length > prevFavCount.current) {
            setIsSpinning(true);
            setSpinKey(k => k + 1); //immagine rimontata al primo frame
            clearTimeout(spinTimer.current); // ricarica countdown se già a frame 2
            spinTimer.current = setTimeout(() => setIsSpinning(false), SPIN_DURATION);
        }
        prevFavCount.current = favorites.length;
}, [favorites.length]);

    const favoritesPanelRef = useRef(null);
    const favoritesBtnRef = useRef(null);

    useEffect(() => {
        if (!isFavoritesOpen) return;
        const handleClickOutside = e => {
            // il bottone è escluso, altrimenti il suo onClick riaprirebbe subito il pannello
            if (favoritesPanelRef.current?.contains(e.target)) return;
            if (favoritesBtnRef.current?.contains(e.target)) return;
            setIsFavoritesOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isFavoritesOpen]);

return (
    <>
        <header className='header'>
            <NavLink to="/" className='store-logo'>
                <img src="src\images\logo_img_main.png" alt="logo-img-main" className='logo-img-main' />
                <img src="src\images\logo_img_secondary.png" alt="logo-img-secondary" className='logo-img-secondary' />
            </NavLink>
            <div className='header-nav'>
                <form className="searchbar" onSubmit={handleSubmit}>
                    <input type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleChange}
                        className='search-input'
                    />
                    <button type="submit" className='search-btn'>
                        <img src="src\images\search_icon.jpg" alt="search-icon" className='search-icon' />
                    </button>
                </form>
                <div className="product-buttons">
                    <button
                        className="icon-btn favorites-btn"
                        ref={favoritesBtnRef}
                        onClick={() => setIsFavoritesOpen(open => !open)}
                    >
                        <img key={spinKey} src={isSpinning ? starSpinning : starStill} alt="Favorites" className="btn-icon" />
                        {favorites.length > 0 && <span className='btn-icon-count'>{favorites.length}</span>}
                    </button>
                    <button className="icon-btn compare-btn" onClick={() => setIsCompareOpen(true)}>
                        <img src={compareIcon} alt="Compare" className="btn-icon" />
                        {productsToCompare.length > 0 && <span className='btn-icon-count'>{productsToCompare.length}</span>}
                    </button>
                </div>
            </div>
        </header>
        {isFavoritesOpen && <Favorites panelRef={favoritesPanelRef} />}
        <Modal
            content={<CompareProducts />}
            show={isCompareOpen}
            onClose={() => setIsCompareOpen(false)}
        />
    </>
);
}