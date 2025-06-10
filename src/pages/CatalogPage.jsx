import {useState, useEffect} from 'react';
import ProductCard from './ProductCard';
import {useNavigate} from 'react-router-dom';
import {fetchProducts, fetchCategories} from '../api';

export default function CatalogPage() {
  const [filter, setFilter] = useState('all');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

  if (loading) return <div style={{color: '#fff', padding: 32}}>Загрузка...</div>;
  if (error) return <div style={{color: '#fff', padding: 32}}>Ошибка: {error}</div>;

  return (
    <main className="main">
      <div className="container" style={{paddingLeft: 16, paddingRight: 16}}>
        <div className="catalog-container" style={{marginBottom: 32}}>
          <div className="catalog-title">Оптика</div>
          <div className="catalog-filters">
            {categories.map(cat => (
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
                image={product.image}
                onClick={() => navigate(`/catalog/${product.id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
