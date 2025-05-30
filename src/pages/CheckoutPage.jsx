import {useState} from 'react';

export default function CheckoutPage({ cart, onClear }) {
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
  const deliveryPrice = 0;
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
      window.location.href = '/';
      alert('Заказ успешно оформлен!');
    }, 1200);
  };

  return (
    <main className="main">
      <div className="container">
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
      </div>
    </main>
  );
} 