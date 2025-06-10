export default function ProductCard({title, price, image, onClick}) {
  const imageUrl = image.startsWith('http')?image:`/images/products/${image}`;
  
  return (
    <div className="catalog-card" onClick={onClick} style={{cursor: onClick ? 'pointer' : 'default'}}>
      <div className="catalog-card__img" style={{backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'}} />
      <div className="catalog-card__title">{title}</div>
      {price && <div className="catalog-card__price">{price}</div>}
    </div>
  );
}
