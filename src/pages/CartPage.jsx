import {useNavigate} from 'react-router-dom';
import {useCart} from '../context/CartContext.jsx';

export default function CartPage() {
  const navigate = useNavigate();
  const {cart, handleChangeQty, handleRemove} = useCart();
  const total = cart.reduce((sum, item) => sum + item.priceValue * item.qty, 0);

  return (
    <main className="main">
      <div className="container">
        <div className="cart-title">Корзина</div>
        {cart.length === 0 ? (
          <div style={{color: '#fff', margin: '32px 0'}}>Корзина пуста</div>
        ) : (
          <>
            {cart.map(item => {
              const imageUrl = item.image.startsWith('http') ? item.image : `/images/products/${item.image}`;
              return (
                <div className="cart-row" key={item.id}>
                  <div className="cart-row-img" style={{backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'}} />
                  <div className="cart-row-info">
                    <div className="cart-row-title">{item.title}</div>
                    <div className="cart-row-price">{item.price}</div>
                  </div>
                  <div className="cart-row-qty">
                    <button className="cart-qty-btn" onClick={() => handleChangeQty(item.id, item.qty - 1)} disabled={item.qty <= 1}>-</button>
                    <span className="cart-qty-value">{item.qty}</span>
                    <button className="cart-qty-btn" onClick={() => handleChangeQty(item.id, item.qty + 1)}>+</button>
                  </div>
                  <button className="cart-row-remove" onClick={() => handleRemove(item.id)} title="Удалить">×</button>
                </div>
              );
            })}
            <div className="cart-total-label">Итого</div>
            <div className="cart-total-value">{total.toLocaleString('ru-RU')}₽</div>
            <div className="cart-order-btn-block">
              <button className="cart-order-btn" onClick={() => navigate('/checkout')}>Оформить заказ</button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
