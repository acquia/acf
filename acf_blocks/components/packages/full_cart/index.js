import React from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withAcfStore } from 'acf'
import { ACF_ID_FULL_CART, ACF_PATH_CHECKOUT } from 'acf/constants'
import { updateInCart, removeFromCart } from 'acf/actions'
import FormSelect from 'acf/utils/FormSelect'
import ProductInCart from './ProductInCart'

const FullCart = ({cartState, productState, updateInCart, removeFromCart}) => {
  const {cartProducts, count, totalPrice} = cartState
  const productsArray = Object.keys(cartProducts)
  const deliveryOptions = [
    'Standard Delivery - $2.5',
    'Premium Delivery - $5.00'
  ]
  const paymentOptions = [
    'visa',
    'pp',
    'mastercard'
  ]

  return (
    <div className="acf-full-cart">
      <div className="acf-full-cart__inner">
        <div className="acf-full-cart__main">
          <h2 className="acf-full-cart__heading">{'My cart'}</h2>
          {
            count > 0 ? (
              <ul className="acf-full-cart__product-list">
                {
                  productsArray.map(sku => (
                    <li key={sku}>
                      <ProductInCart sku={sku}
                                     product={cartProducts[sku]}
                                     productDetails={productState.productList[sku]}
                                     updateInCart={updateInCart}
                                     removeFromCart={removeFromCart}
                      />
                    </li>
                  ))
                }
              </ul>
            ) : (
              <div>{'Your cart is currently empty.'}</div>
            )
          }
        </div>
        {
          count > 0 && (
            <div className="acf-checkout">
              <h2 className="acf-checkout__heading">Order Summary</h2>
              <div className="acf-checkout__subtotal">
                <span className="acf-checkout__label">Sub-total:</span>
                <span>{totalPrice.toFixed(2)}</span>
              </div>
              <div className="acf-checkout__tax">
                <span className="acf-checkout__label">Estimated Tax:</span>
                <span>$0.00</span>
              </div>
              <div className="acf-checkout__delivery">
                <div className="acf-checkout__label">Delivery:</div>
                <FormSelect options={deliveryOptions} />
              </div>
              <a className="acf-checkout__button" href={ACF_PATH_CHECKOUT}>Checkout</a>
              <div className="acf-checkout__accept">We Accept:</div>
              <ul className="acf-checkout__payment-options">
                {
                  paymentOptions.map(
                    paymentOption => <li className={`acf-checkout__payment-${paymentOption}`}/>
                  )
                }
              </ul>
            </div>
          )
        }
      </div>
    </div>
  )
}

function mapStateToProps ({cartState, productState}) {
  return {cartState, productState}
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    {updateInCart, removeFromCart},
    dispatch
  )
}

const FullCartWithStore = connect(mapStateToProps, mapDispatchToProps)(FullCart)

ReactDOM.render(
  withAcfStore(FullCartWithStore),
  document.getElementById(ACF_ID_FULL_CART)
)
