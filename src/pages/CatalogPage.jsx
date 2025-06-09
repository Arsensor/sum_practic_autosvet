import { useState } from 'react';
import {PRODUCTS, CATEGORIES} from '../data';
import {useNavigate} from 'react-router-dom';
import { CardProduct } from '../components/CardProduct';

export default function CatalogPage() {
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  const filtered = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  return (
    <main className="main">
      <div className="container" style={{paddingLeft: 16, paddingRight: 16}}>
        <div className="catalog-container" style={{marginBottom: 32}}>
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
              <CardProduct
                key={product.id}
                title={product.title}
                price={product.price}
                onClick={() => navigate(`/catalog/${product.id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 