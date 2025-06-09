import { CardProduct } from '../components/CardProduct';

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

export default function MainPage() {
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
          <div className="products-row" style={{ justifyContent: 'center', flexWrap: 'nowrap', overflowX: 'auto' }}>
            {newProducts.map(product => (
              <CardProduct key={product.id} title={product.title} />
            ))}
          </div>
        </section>
        <section className="section">
          <h2 className="section__title">Популярные товары</h2>
          <div className="products-row" style={{ justifyContent: 'center', flexWrap: 'nowrap', overflowX: 'auto' }}>
            {popularProducts.map(product => (
              <CardProduct key={product.id} title={product.title} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
} 