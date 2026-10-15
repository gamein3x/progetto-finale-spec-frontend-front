import { NavLink, Routes, Route } from 'react-router-dom';

import HomePage from './Pages/HomePage.jsx';
import ShopPage from './Pages/ShopPage.jsx';
import DetailPage from './Pages/DetailPage';
import NotFoundPage from './Pages/NotFoundPage.jsx';

import './App.css'

function App() {

  return (
    <>
      <header>
        <NavLink to="/">
          <img src="" alt="store-logo" className='store-logo' />
        </NavLink>
        <div className="searchbar">
          <input type="text" />
          <button>S</button>
        </div>
        <div className="product-buttons">
          <button className="favorites">⭐</button>
          <button className="shoplist">🛒</button>
        </div>
      </header>
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
