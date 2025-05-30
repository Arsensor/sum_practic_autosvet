import React, { useState } from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';

const CATEGORIES = [
  { key: 'all', label: 'Все' },
  { key: 'front', label: 'Передняя оптика' },
  { key: 'rear', label: 'Задние фонари' },
  { key: 'fog', label: 'Противотуманные фары' },
];

const PRODUCTS = [
  { id: 1, title: 'Передняя оптика BMW X5 E70 (Рест)', price: '80.000₽', category: 'front' },
  { id: 2, title: 'Противотуманные фары Subaru Forester', price: '8500₽', category: 'fog' },
  { id: 3, title: 'Передняя оптика Mercedes-Benz C217', price: '150.000₽', category: 'front' },
  { id: 4, title: 'Передняя оптика Mercedes-Benz W204', price: '55.000₽', category: 'front' },
  { id: 5, title: 'Передняя оптика Mercedes-Benz V167', price: '189.000₽', category: 'front' },
  { id: 6, title: 'Поворотники ChargeSpeed Subaru WRX/Forester/Levorg', price: '17.500₽', category: 'front' },
  { id: 7, title: 'Передняя оптика Mercedes-Benz S212', price: '67.000₽', category: 'front' },
  { id: 8, title: 'Задние фонари BMW 5-Series F10 (Рест)', price: '25.000₽', category: 'rear' },
  { id: 9, title: 'Передняя оптика Mercedes-Benz W222', price: '125.000₽', category: 'front' },
  { id: 10, title: 'Противотуманные фары универсальные', price: '5500₽', category: 'fog' },
  { id: 11, title: 'Задние фонари Subaru XV', price: '18.500₽', category: 'rear' },
  { id: 12, title: 'Передняя оптика Lada Priora 2', price: '25.000₽', category: 'front' },
  { id: 13, title: 'Передняя оптика Renaul Duster (Рест)', price: '36.000₽', category: 'front' },
  { id: 14, title: 'Задние фонари Mercedes-Benz W140', price: '15.000₽', category: 'rear' },
  { id: 15, title: 'Передняя оптика Ford Focus 3', price: '45.000₽', category: 'front' },
];

const newProducts = [
  { id: 1, title: 'Передняя оптика Multibeam на Mercedes-Benz GLE V167 (Рестайлинг)' },
  { id: 2, title: 'Задние фонари на BMW M5 F90 (Рестайлинг)' },
  { id: 3, title: 'Противотуманные фары универсальные' },
];

const popularProducts = [
  { id: 4, title: 'Передняя оптика на BMW X5 E70 (Рестайлинг)' },
  { id: 5, title: 'Задние фонари на BMW 5-series F10' },
  { id: 6, title: 'Противотуманные фары на Subaru Forester SH' },
];

function Header() {
  return (
    <header className="header">
      <div className="header__left">
        <span className="logo">АвтоСвет</span>
        <nav className="nav">
          <Link to="/" className="nav__link">Главная</Link>
          <Link to="/catalog" className="nav__link">Каталог товаров</Link>
          <a href="#" className="nav__link">О компании</a>
        </nav>
      </div>
      <div className="header__right">
        <div className="search">
          <span className="search__icon" />
          <input className="search__input" placeholder="Поиск" />
        </div>
        <div className="cart">
          <span className="cart__icon" />
        </div>
      </div>
    </header>
  );
}

function ProductCard({ title, price }) {
  return (
    <div className="catalog-card">
      <div className="catalog-card__img" />
      <div className="catalog-card__title">{title}</div>
      <div className="catalog-card__price">{price}</div>
    </div>
  );
}

function Main() {
  return (
    <main className="main">
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__content">
          <h1 className="hero__title">Улучшии свою оптику</h1>
          <p className="hero__desc">Улучшение света на вашем автомобиле, при помощи качественных компонентов премиальной линейки линз, задних фонарей и противотуманных фар.</p>
          <button className="hero__btn">Приобрести</button>
        </div>
      </section>
      <section className="section">
        <h2 className="section__title">Новые товары</h2>
        <div className="products-row">
          {newProducts.map(product => (
            <ProductCard key={product.id} title={product.title} />
          ))}
        </div>
      </section>
      <section className="section">
        <h2 className="section__title">Популярные товары</h2>
        <div className="products-row">
          {popularProducts.map(product => (
            <ProductCard key={product.id} title={product.title} />
          ))}
        </div>
      </section>
    </main>
  );
}

function Catalog() {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  return (
    <main className="main">
      <div className="catalog-title">Оптика</div>
      <div className="catalog-filters">
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            className={`catalog-filter-btn${filter === cat.key ? ' active' : ''}`}
            onClick={() => setFilter(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="catalog-grid">
        {filtered.map(product => (
          <ProductCard key={product.id} title={product.title} price={product.price} />
        ))}
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <span>© 2025 АвтоСвет. Все права защищены.</span>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/catalog" element={<Catalog />} />
      </Routes>
      <Footer />
    </div>
  );
}
