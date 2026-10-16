import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation, useSearchParams } from 'react-router-dom';

export default function Header() {

    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    const isShopPage = location.pathname === "/shop";

    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

    useEffect(() => {
        if (isShopPage) setSearchQuery(searchParams.get("search") || "");
    }, [isShopPage, searchParams]);

    const goToShop = (term, replace = false) => {
        navigate(term ? `/shop?search=${encodeURIComponent(term)}` : "/shop", { replace });
    };

    const handleChange = e => {
        const value = e.target.value;
        setSearchQuery(value);
        if (isShopPage) goToShop(value, true); // live results only on the shop page
    };

    const handleSubmit = e => {
        e.preventDefault();
        const term = searchQuery.trim();
        navigate(term ? `/shop?search=${encodeURIComponent(term)}` : "/shop");
    };

    return (
        <header className='header'>
            <NavLink to="/" className='store-logo'>
                <img src="/logo-test-dark.png" alt="store-logo" className='store-logo-img' />
            </NavLink>
            <div className='header-nav'>
                <form className="searchbar" onSubmit={handleSubmit}>
                    <input type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleChange}
                        className='search-input'
                    />
                    <button type="submit" className='search-btn'>S</button>
                </form>
                <div className="product-buttons">
                    <button className="favorites">⭐</button>
                    <button className="shoplist">🛒</button>
                </div>
            </div>
        </header>
    );
}