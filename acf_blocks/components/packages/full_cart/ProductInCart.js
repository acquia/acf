import React from 'react'
import FormSelect from 'acf/utils/FormSelect'

const ProductInCart = ({sku, product, productDetails, updateInCart, removeFromCart}) => {
  const {color, size, qty} = product
  const {images, price, title, inventory} = productDetails
  const subTotal = qty * price

  return (
    <div className="acf-product-card">
      <div className="acf-product-card__inner">
        <div className="acf-product-card__image">
          <img src={images[0]} alt={title}/>
        </div>
        <div className="acf-product-card__content">
          <div className="acf-product-card__price">{price.toFixed(2)}</div>
          <h2 className="acf-product-card__title">{title}</h2>

          <ul className="acf-product-card__variants-list">
            <Variant label={'Color'}>{color}</Variant>

            <Variant label={'Size'}>{size}</Variant>

            <Variant label={'Qty'}>
              <FormSelect value={qty}
                          options={[...Array(inventory).keys()].map(n => ++n)}
                          onChange={evt => updateInCart(sku, +evt.target.value, price)}/>
            </Variant>
          </ul>

          <div className="acf-product-card__subtotal">
            <span className="acf-product-card__subtotal-label">Sub-Total:</span>
            <span>{subTotal.toFixed(2)}</span>
          </div>

          <input className="acf-product-card__remove" title={'Remove'}
                 type='button' onClick={() => removeFromCart(sku, qty, price)}/>
        </div>
      </div>
    </div>
  )
}

function Variant ({label, children}) {
  return (
    <li>
      <label className="acf-product-card__variant">
        <b className="acf-product-card__variant-label">{label}</b>
        <div className="acf-product-card__variant-options">
          {children}
        </div>
      </label>
    </li>
  )
}

export default ProductInCart
