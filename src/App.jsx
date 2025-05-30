import {useState} from 'react';
import './App.css';
import {Routes, Route, Link, useNavigate} from 'react-router-dom';
import MainPage from './pages/MainPage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AboutPage from './pages/AboutPage';

function Header({ cartCount }) {
  const navigate = useNavigate();
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
            <input className="search__input" placeholder="Поиск" />
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
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart(prev => {
      const found = prev.find(item => item.id === product.id);
      if (found) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleChangeQty = (id, qty) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(1, qty) } : item));
  };

  const handleRemove = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleClear = () => setCart([]);

  return (
    <div className="app">
      <Header cartCount={cart.reduce((sum, item) => sum + item.qty, 0)} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<ProductPage onAddToCart={handleAddToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} onChangeQty={handleChangeQty} onRemove={handleRemove} />} />
        <Route path="/checkout" element={<CheckoutPage cart={cart} onClear={handleClear} />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
