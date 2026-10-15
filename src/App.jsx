import { useState, useMemo } from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import { useGlobalContext } from './context/GlobalContext.jsx'

import HomePage from './Pages/HomePage.jsx';
import ShopPage from './Pages/ShopPage.jsx';
import DetailPage from './Pages/DetailPage';
import NotFoundPage from './Pages/NotFoundPage.jsx';

import './App.css'

function App() {

  const { products } = useGlobalContext();

  const [searchQueary, setSearchQueary] = useState("");

  const sortedProducts = useMemo(() => {
    return [...products]
      .filter(t =>
        t.title.toLowerCase().includes(searchQueary.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQueary.toLowerCase()))
  }, [searchQueary]);

  return (
    <>
      <header>
        <NavLink to="/">
          <img alt="store-logo" className='store-logo' />
        </NavLink>
        <div className="searchbar">
          <input type="text"
            placeholder="Search..."
            value={searchQueary}
            onChange={e => setSearchQueary(e.target.value)}
          />
          <button>S</button>
        </div>
        <div className="product-buttons">
          <button className="favorites">⭐</button>
          <button className="shoplist">🛒</button>
        </div>
      </header>
      <main>
        {sortedProducts.map(product => (
          <div key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.category}</p>
          </div>
        ))}
      </main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:id" element={<DetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
