export const CardProduct = ()=>{
    return <div className="catalog-card" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div className="catalog-card__img" />
      <div className="catalog-card__title">{title}</div>
      {price && <div className="catalog-card__price">{price}</div>}
    </div>
}