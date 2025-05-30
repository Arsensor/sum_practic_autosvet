import React from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../data';

export default function ProductPage({ onAddToCart }) {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === Number(id));
  const otherProducts = PRODUCTS.filter(p => p.id !== Number(id)).slice(0, 4);

  if (!product) return <div style={{ color: '#fff', padding: 32 }}>Товар не найден</div>;

  return (
    <main className="main">
      <div className="product-page-card">
        <div className="product-title">{product.title}</div>
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
      </div>
    </main>
  );
} 