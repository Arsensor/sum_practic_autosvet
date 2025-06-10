const API_URL = 'http://localhost:3000';
const TELEGRAM_BOT_TOKEN = '7662583899:AAF3nvKOXF0tRgU-U9kgOevqkLYQ0zICR3I'; // Токен телеграмм бота
const TELEGRAM_CHAT_ID = '754681671'; // ID Чата

export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error('Ошибка переноса товаров');
  }
  return response.json();
};

export const fetchProduct = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error('Ошибка переноса товара');
  }
  return response.json();
};

export const fetchCategories = async () => {
  const response = await fetch(`${API_URL}/categories`);
  if (!response.ok) {
    throw new Error('Ошибка переноса категорий');
  }
  return response.json();
};

export const sendOrderNotification = async (orderData) => {
  const message = `
🛒 Новый заказ!

👤 Данные клиента:
Email: ${orderData.email}
Телефон: ${orderData.phone}
Адрес: ${orderData.address}
Город: ${orderData.city}
Область: ${orderData.region}
Индекс: ${orderData.zip}

📦 Товары:
${orderData.cart.map(item => `- ${item.title} (${item.qty} шт.) - ${item.price}`).join('\n')}

💰 Итого: ${orderData.total.toLocaleString('ru-RU')}₽
🚚 Способ доставки: ${orderData.delivery === 'post' ? 'Почта' : 'Курьер'}
💳 Способ оплаты: ${orderData.payment === 'sbp' ? 'СБП' : 'Карта'}
`;

  const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML',
    }),
  });
  if (!response.ok) {
    throw new Error('Ошибка отправки заказа в Telergam');
  }
  return response.json();
};
