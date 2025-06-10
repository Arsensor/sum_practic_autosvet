import {useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import ProductCard from './ProductCard';
import {fetchProduct, fetchProducts} from '../api';
import {useCart} from '../context/CartContext.jsx';

export default function ProductPage() {
  const {id} = useParams();
  const [product, setProduct] = useState(null);
  const [otherProducts, setOtherProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {handleAddToCart} = useCart();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productData, allProducts] = await Promise.all([
          fetchProduct(id),
          fetchProducts()
        ]);
        setProduct(productData);
        setOtherProducts(allProducts.filter(p => p.id !== Number(id)).slice(0, 4));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  if (loading) return <div style={{ color: '#fff', padding: 32 }}>Загрузка...</div>;
  if (error) return <div style={{ color: '#fff', padding: 32 }}>Ошибка: {error}</div>;
  if (!product) return <div style={{ color: '#fff', padding: 32 }}>Товар не найден</div>;

  const imageUrl = product.image.startsWith('http') ? product.image : `/images/products/${product.image}`;

  return (
    <main className="main">
      <div className="product-page-card">
        <div className="product-title">{product.title}</div>
        <div className="product-image" style={{
          width: '100%',
          height: '385px',
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '8px',
          marginBottom: '20px'
        }} />
        <div className="product-price-block">
          <span className="product-price-label">Цена: </span>
          <span className="product-price-value">{product.price}</span>
          <button className="product-cart-btn" onClick={() => handleAddToCart(product)}>В корзину</button>
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
            <ProductCard key={p.id} title={p.title} price={p.price} image={p.image} onClick={() => window.location.href = `/catalog/${p.id}`} />
          ))}
        </div>
      </div>
    </main>
  );
}
