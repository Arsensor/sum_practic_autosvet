import React, { useState } from 'react';
import './App.css';
import { Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';

const CATEGORIES = [
  { key: 'all', label: 'Все' },
  { key: 'front', label: 'Передняя оптика' },
  { key: 'rear', label: 'Задние фонари' },
  { key: 'fog', label: 'Противотуманные фары' },
];

const PRODUCTS = [
  {
    id: 1,
    title: 'Передняя оптика BMW X5 E70 (Рест)',
    price: '80.000₽',
    priceValue: 80000,
    category: 'front',
    image: '',
    description: 'Описание для передней оптики BMW X5 E70 (Рест).',
    features: {
      'Светодиоды': '12 штук',
      'Цвет': 'Кристально прозрачный',
      'Вольтаж': '12V',
      'Гарантия': '2 года',
    },
  },
  {
    id: 2,
    title: 'Противотуманные фары Subaru Forester',
    price: '8500₽',
    priceValue: 8500,
    category: 'fog',
    image: '',
    description: 'Описание для противотуманных фар Subaru Forester.',
    features: {
      'Светодиоды': '12 штук',
      'Цвет': 'Кристально прозрачный',
      'Вольтаж': '12V',
      'Гарантия': '2 года',
    },
  },
  {
    id: 3,
    title: 'Задний фонарь Subaru Impreza WRX/STI/XV Crosstrek LED',
    price: '6900₽',
    priceValue: 6900,
    category: 'rear',
    image: '',
    description: 'Для Subaru Impreza и XV Crosstrek, поскольку отверстие для заднего фонаря на бампере не было открыто полностью, вы не сможете использовать металлический кронштейн, поставляемый в комплекте, вместо этого вам придется изготовить несколько прокладок, чтобы равномерно расположить этот светодиодный задний противотуманный фонарь в отверстии для заднего противотуманного фонаря.',
    features: {
      'Светодиоды': '12 штук',
      'Цвет': 'Кристально прозрачный',
      'Вольтаж': '12V',
      'Гарантия': '2 года',
    },
  },
  { id: 4, title: 'Передняя оптика Mercedes-Benz C217', price: '150.000₽', category: 'front' },
  { id: 5, title: 'Передняя оптика Mercedes-Benz W204', price: '55.000₽', category: 'front' },
  { id: 6, title: 'Передняя оптика Mercedes-Benz V167', price: '189.000₽', category: 'front' },
  {
    id: 7,
    title: 'Поворотники ChargeSpeed Subaru WRX/Forester/Levorg',
    price: '17.500₽',
    priceValue: 17500,
    category: 'front',
    image: '',
    description: '',
    features: {},
  },
  { id: 8, title: 'Передняя оптика Mercedes-Benz S212', price: '67.000₽', category: 'front' },
  { id: 9, title: 'Задние фонари BMW 5-Series F10 (Рест)', price: '25.000₽', category: 'rear' },
  { id: 10, title: 'Передняя оптика Mercedes-Benz W222', price: '125.000₽', category: 'front' },
  { id: 11, title: 'Противотуманные фары универсальные', price: '5500₽', category: 'fog' },
  { id: 12, title: 'Задние фонари Subaru XV', price: '18.500₽', category: 'rear' },
  { id: 13, title: 'Передняя оптика Lada Priora 2', price: '25.000₽', category: 'front' },
  { id: 14, title: 'Передняя оптика Renaul Duster (Рест)', price: '36.000₽', category: 'front' },
  { id: 15, title: 'Задние фонари Mercedes-Benz W140', price: '15.000₽', category: 'rear' },
  { id: 16, title: 'Передняя оптика Ford Focus 3', price: '45.000₽', category: 'front' },
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

function Header({ cartCount }) {
  const navigate = useNavigate();
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
        <div className="cart" onClick={() => navigate('/cart')} style={{ cursor: 'pointer', position: 'relative' }}>
          <span className="cart__icon" />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </div>
      </div>
    </header>
  );
}

function ProductCard({ title, price, onClick }) {
  return (
    <div className="catalog-card" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div className="catalog-card__img" />
      <div className="catalog-card__title">{title}</div>
      {price && <div className="catalog-card__price">{price}</div>}
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

function Catalog({ onAddToCart }) {
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
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
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            onClick={() => navigate(`/catalog/${product.id}`)}
          />
        ))}
      </div>
    </main>
  );
}

function ProductPage({ onAddToCart }) {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === Number(id));
  const otherProducts = PRODUCTS.filter(p => p.id !== Number(id)).slice(0, 4);

  if (!product) return <div style={{ color: '#fff', padding: 32 }}>Товар не найден</div>;

  return (
    <main className="main">
      <div className="breadcrumbs">
        <Link to="/" className="breadcrumbs__link">Главная</Link>
        <span className="breadcrumbs__sep">/</span>
        <Link to="/catalog" className="breadcrumbs__link">Каталог товаров</Link>
        <span className="breadcrumbs__sep">/</span>
        <span className="breadcrumbs__current">{product.category === 'front' ? 'Передняя оптика' : product.category === 'rear' ? 'Задние фонари' : 'Противотуманные фары'}</span>
      </div>
      <div className="product-title">{product.title}</div>
      <div className="product-image-block">
        <div className="product-image" />
      </div>
      <div className="product-price-block">
        <span className="product-price-label">Цена: </span>
        <span className="product-price-value">{product.price}</span>
        <button className="product-cart-btn" onClick={() => onAddToCart(product)}>В корзину</button>
      </div>
      <div className="product-description">{product.description}</div>
      <div className="product-features-title">Характеристики</div>
      <div className="product-features">
        {product.features && Object.entries(product.features).map(([key, value]) => (
          <div className="product-feature-row" key={key}>
            <div className="product-feature-key">{key}</div>
            <div className="product-feature-value">{value}</div>
          </div>
        ))}
      </div>
      <div className="product-other-title">Другие товары</div>
      <div className="product-other-grid">
        {otherProducts.map(p => (
          <ProductCard key={p.id} title={p.title} price={p.price} onClick={() => window.location.href = `/catalog/${p.id}`} />
        ))}
      </div>
    </main>
  );
}

function CartPage({ cart, onChangeQty, onRemove, onClear }) {
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.priceValue * item.qty, 0);

  return (
    <main className="main">
      <div className="cart-title">Корзина</div>
      {cart.length === 0 ? (
        <div style={{ color: '#fff', margin: '32px 0' }}>Корзина пуста</div>
      ) : (
        <>
          {cart.map(item => (
            <div className="cart-row" key={item.id}>
              <div className="cart-row-img" />
              <div className="cart-row-info">
                <div className="cart-row-title">{item.title}</div>
                <div className="cart-row-price">{item.price}</div>
              </div>
              <div className="cart-row-qty">
                <button className="cart-qty-btn" onClick={() => onChangeQty(item.id, item.qty - 1)} disabled={item.qty <= 1}>-</button>
                <span className="cart-qty-value">{item.qty}</span>
                <button className="cart-qty-btn" onClick={() => onChangeQty(item.id, item.qty + 1)}>+</button>
              </div>
              <button className="cart-row-remove" onClick={() => onRemove(item.id)} title="Удалить">×</button>
            </div>
          ))}
          <div className="cart-total-label">Итого</div>
          <div className="cart-total-value">{total.toLocaleString('ru-RU')}₽</div>
          <div className="cart-order-btn-block">
            <button className="cart-order-btn" onClick={() => navigate('/checkout')}>Оформить заказ</button>
          </div>
        </>
      )}
    </main>
  );
}

function CheckoutPage({ cart, onClear }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    zip: '',
    delivery: 'post',
    payment: 'sbp',
  });
  const [submitting, setSubmitting] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.priceValue * item.qty, 0);
  const deliveryPrice = 0; // Можно добавить расчёт
  const grandTotal = total + deliveryPrice;

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleRadio = (name, value) => {
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onClear();
      navigate('/');
      alert('Заказ успешно оформлен!');
    }, 1200);
  };

  return (
    <main className="main">
      <div className="breadcrumbs">
        <Link to="/cart" className="breadcrumbs__link">Корзина</Link>
        <span className="breadcrumbs__sep">/</span>
        <span className="breadcrumbs__current">Оформление заказа</span>
      </div>
      <div className="checkout-title">Заказ</div>
      <form className="checkout-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="checkout-fields">
          <div className="checkout-field">
            <label>Email</label>
            <input name="email" value={form.email} onChange={handleChange} className="checkout-input" required type="email" />
          </div>
          <div className="checkout-field">
            <label>Контактный телефон</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="checkout-input" required />
          </div>
          <div className="checkout-field">
            <label>Адрес</label>
            <input name="address" value={form.address} onChange={handleChange} className="checkout-input" required />
          </div>
          <div className="checkout-field">
            <label>Город</label>
            <input name="city" value={form.city} onChange={handleChange} className="checkout-input" required />
          </div>
          <div className="checkout-row">
            <div className="checkout-field half">
              <label>Облать/Край</label>
              <input name="region" value={form.region} onChange={handleChange} className="checkout-input" required />
            </div>
            <div className="checkout-field half">
              <label>Почтовый индекс</label>
              <input name="zip" value={form.zip} onChange={handleChange} className="checkout-input" required />
            </div>
          </div>
        </div>
        <div className="checkout-section-title">Доставка</div>
        <div className="checkout-delivery">
          <label className={`checkout-radio-block${form.delivery === 'post' ? ' selected' : ''}`}>
            <input type="radio" name="delivery" checked={form.delivery === 'post'} onChange={() => handleRadio('delivery', 'post')} />
            <div>
              <div className="checkout-radio-title">Почта России</div>
              <div className="checkout-radio-desc">5-7 рабочих дней</div>
            </div>
          </label>
          <label className={`checkout-radio-block${form.delivery === 'cdek' ? ' selected' : ''}`}>
            <input type="radio" name="delivery" checked={form.delivery === 'cdek'} onChange={() => handleRadio('delivery', 'cdek')} />
            <div>
              <div className="checkout-radio-title">СДЭК</div>
              <div className="checkout-radio-desc">2-3 рабочих дней</div>
            </div>
          </label>
        </div>
        <div className="checkout-section-title">Способ оплаты</div>
        <div className="checkout-payment">
          <label className={`checkout-radio-block${form.payment === 'sbp' ? ' selected' : ''}`}>
            <input type="radio" name="payment" checked={form.payment === 'sbp'} onChange={() => handleRadio('payment', 'sbp')} />
            <div className="checkout-radio-title">СБП</div>
          </label>
          <label className={`checkout-radio-block${form.payment === 'card' ? ' selected' : ''}`}>
            <input type="radio" name="payment" checked={form.payment === 'card'} onChange={() => handleRadio('payment', 'card')} />
            <div className="checkout-radio-title">Карта</div>
          </label>
        </div>
        <div className="checkout-section-title">Итоговый заказ</div>
        <div className="checkout-order-list">
          {cart.map(item => (
            <div className="checkout-order-row" key={item.id}>
              <div className="checkout-order-img" />
              <div className="checkout-order-info">
                <div className="checkout-order-title">{item.qty} x {item.title}</div>
                <div className="checkout-order-price">{item.price}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="checkout-summary">
          <div className="checkout-summary-row">
            <span>Сумма товаров</span>
            <span>{total.toLocaleString('ru-RU')}₽</span>
          </div>
          <div className="checkout-summary-row">
            <span>Доставка</span>
            <span>{deliveryPrice ? deliveryPrice + '₽' : '0₽'}</span>
          </div>
          <div className="checkout-summary-row">
            <span>Итого</span>
            <span>{grandTotal.toLocaleString('ru-RU')}₽</span>
          </div>
        </div>
        <div className="checkout-btn-block">
          <button className="checkout-btn" type="submit" disabled={submitting}>{submitting ? 'Оплата...' : 'Оплатить'}</button>
        </div>
      </form>
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
        <Route path="/" element={<Main />} />
        <Route path="/catalog" element={<Catalog onAddToCart={handleAddToCart} />} />
        <Route path="/catalog/:id" element={<ProductPage onAddToCart={handleAddToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} onChangeQty={handleChangeQty} onRemove={handleRemove} onClear={handleClear} />} />
        <Route path="/checkout" element={<CheckoutPage cart={cart} onClear={handleClear} />} />
      </Routes>
      <Footer />
    </div>
  );
}
