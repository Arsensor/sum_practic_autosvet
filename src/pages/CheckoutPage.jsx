import {useState} from 'react';
import {sendOrderNotification} from '../api';
import {useCart} from '../context/CartContext.jsx';

export default function CheckoutPage() {
  const {cart, handleClear} = useCart();
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
  const [error, setError] = useState(null);

  const deliveryCost = form.delivery === 'post' ? 300 : 500; // Примерные стоимости доставки
  const subtotal = cart.reduce((sum, item) => sum + item.priceValue * item.qty, 0);
  const grandTotal = subtotal + deliveryCost;
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleRadio = (name, value) => {
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const orderData = {
        ...form,
        cart: cart.map(item => ({id: item.id, title: item.title, qty: item.qty, price: item.price})),
        total: grandTotal,
      };
      await sendOrderNotification(orderData);
      handleClear();
      alert('Заказ успешно оформлен!');
    } catch (err) {
      setError('Не удалось отправить уведомление о заказе. Пожалуйста, попробуйте еще раз.');
      console.error('Ошибка отправки уведомления:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="main">
      <div className="container">
        <div className="checkout-title">Заказ</div>
        {error && <div style={{ color: '#e74c3c', marginBottom: 16 }}>{error}</div>}
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
                <label>Область/Край</label>
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
          {cart.length === 0 ? (
            <div style={{ color: '#fff', marginBottom: 16 }}>Корзина пуста</div>
          ) : (
            <div className="checkout-order-list">
              {cart.map(item => {
                const imageUrl = item.image.startsWith('http') ? item.image : `/images/products/${item.image}`;
                return (
                  <div className="checkout-order-row" key={item.id}>
                    <div className="checkout-order-img" style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                    <div className="checkout-order-info">
                      <div className="checkout-order-title">{item.title} x {item.qty}</div>
                      <div className="checkout-order-price">{item.price}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="checkout-summary">
            <div className="checkout-summary-row">
              <span>Промежуточная сумма:</span>
              <span>{subtotal.toLocaleString('ru-RU')}₽</span>
            </div>
            <div className="checkout-summary-row">
              <span>Доставка:</span>
              <span>{deliveryCost.toLocaleString('ru-RU')}₽</span>
            </div>
            <div className="checkout-summary-row" style={{ fontWeight: 'bold' }}>
              <span>Всего:</span>
              <span>{grandTotal.toLocaleString('ru-RU')}₽</span>
            </div>
          </div>
          <div className="checkout-btn-block">
            <button type="submit" className="cart-order-btn" disabled={submitting}>
              {submitting ? 'Отправка...' : 'Оформить заказ'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
