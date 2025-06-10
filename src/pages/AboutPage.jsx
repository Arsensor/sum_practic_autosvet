export default function AboutPage() {
  return (
    <main className="main">
      <div className="container">
        <div className="about-card">
          <div className="about-title big">О компании</div>
          <div className="about-desc">
            Мы — команда профессионалов, увлечённых автосветом. Наша миссия — обеспечить вас качественными и надёжными решениями для освещения вашего автомобиля.<br /><br />
            Мы предлагаем широкий ассортимент продукции от ведущих производителей: фары, лампы, противотуманные фары и многое другое. Наша цель — сделать ваш автомобиль ярче и безопаснее на дороге.
          </div>
          <div className="about-contacts-block">
            <div className="about-contacts-title">Контакты</div>
            <div className="about-contacts">
              <span>Адрес: г. Барнаул, ул. Сизова, д. 14</span><br />
              <span>Юридическая информация: ООО "Автосвет", ИНН 771234567890, ОГРН 1234567890123</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
