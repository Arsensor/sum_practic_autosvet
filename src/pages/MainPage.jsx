import {useState, useEffect} from 'react';
import ProductCard from './ProductCard';
import {fetchProducts} from '../api';

export default function MainPage() {
  const [newProducts, setNewProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const products = await fetchProducts();
        setNewProducts(products.slice(-3));
        setPopularProducts(products.slice(0, 3));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div style={{color: '#fff', padding: 32}}>Загрузка...</div>;
  if (error) return <div style={{color: '#fff', padding: 32}}>Ошибка: {error}</div>;

  return (
    <main className="main">
      <div className="container">
        <section className="hero">
          <div className="hero__bg" />
          <div className="hero__content">
            <h1 className="hero__title">Улучши свою оптику</h1>
            <p className="hero__desc">Улучшение света на вашем автомобиле, при помощи качественных компонентов премиальной линейки линз, задних фонарей и противотуманных фар.</p>
          </div>
        </section>
        <section className="section">
          <h2 className="section__title">Новые товары</h2>
          <div className="products-row">
            {newProducts.map(product => (
              <ProductCard 
                key={product.id} 
                title={product.title} 
                price={product.price} 
                image={product.image}
              />
            ))}
          </div>
        </section>
        <section className="section">
          <h2 className="section__title">Популярные товары</h2>
          <div className="products-row">
            {popularProducts.map(product => (
              <ProductCard 
                key={product.id} 
                title={product.title} 
                price={product.price} 
                image={product.image}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
} 
