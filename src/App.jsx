import { useState, useMemo } from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import { useGlobalContext } from './context/GlobalContext.jsx'

import HomeProductCard from './components/HomeProductCard.jsx';
import Header from './components/Header.jsx';

import HomePage from './Pages/HomePage.jsx';
import ShopPage from './Pages/ShopPage.jsx';
import DetailPage from './Pages/DetailPage';
import NotFoundPage from './Pages/NotFoundPage.jsx';

import './App.css'

function App() {

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/products/:type/:id" element={<DetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
