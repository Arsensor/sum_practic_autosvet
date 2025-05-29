import React from 'react';
import './App.css';

function Header() {
  return (
    <header className="header">
      <div className="header__left">
        <span className="logo">АвтоСвет</span>
        <nav className="nav">
          <a href="#" className="nav__link">Главная</a>
          <a href="#" className="nav__link">Каталог товаров</a>
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

function ProductCard({ title }) {
  return (
    <div className="product-card">
      <div className="product-card__img" />
      <div className="product-card__title">{title}</div>
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
          <ProductCard title="Передняя оптика Multibeam на Mercedes-Benz GLE V167 (Рестайлинг)" />
          <ProductCard title="Задние фонари на BMW M5 F90 (Рестайлинг)" />
          <ProductCard title="Противотуманные фары универсальные" />
        </div>
      </section>
      <section className="section">
        <h2 className="section__title">Популярные товары</h2>
        <div className="products-row">
          <ProductCard title="Передняя оптика на BMW X5 E70 (Рестайлинг)" />
          <ProductCard title="Задние фонари на BMW 5-series F10" />
          <ProductCard title="Противотуманные фары на Subaru Forester SH" />
        </div>
      </section>
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
      <Main />
      <Footer />
    </div>
  );
}
