import './App.css';
import {Routes, Route, Link, useNavigate} from 'react-router-dom';
import MainPage from './pages/MainPage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AboutPage from './pages/AboutPage';
import {CartProvider, useCart} from './context/CartContext.jsx';

function Header() {
  const navigate = useNavigate();
  const {cartCount} = useCart();
  return (
    <header className="header" style={{marginTop: 0}}>
      <div className="container" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div className="header__left">
          <span className="logo" style={{cursor: 'pointer'}} onClick={() => navigate('/')}>АвтоСвет</span>
          <nav className="nav">
            <Link to="/catalog" className="nav__link">Каталог товаров</Link>
            <Link to="/about" className="nav__link">О компании</Link>
          </nav>
        </div>
        <div className="header__right">
          <div className="search">
            <span className="search__icon" />
          </div>
          <div className="cart" onClick={() => navigate('/cart')} style={{ cursor: 'pointer', position: 'relative' }}>
            <span className="cart__icon" role="img" aria-label="cart">🛒</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </div>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__content">
        <span>© 2025 АвтоСвет. Все права защищены.</span>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="app">
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer />
      </CartProvider>
    </div>
  );
}
