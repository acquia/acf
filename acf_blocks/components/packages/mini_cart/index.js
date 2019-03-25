import React from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withAcfStore } from 'acf'
import { ACF_PATH_CART, ACF_ID_MINI_CART, ACF_PATH_CHECKOUT } from 'acf/constants'
import { removeFromCart } from 'acf/actions'
import ProductInCart from './ProductInCart'

class MiniCart extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showDropdown: false
    }
  }

  toggleDropdown = () => {
    this.setState(prevState => ({
      showDropdown: !prevState.showDropdown
    }))
  }

  render () {
    const {cartState, productState, removeFromCart} = this.props
    const {cartProducts, count, totalPrice} = cartState
    const productsArray = Object.keys(cartProducts)
    const {showDropdown} = this.state

    return (
      <div className="acf-mini-cart">
        <div className="acf-mini-cart__inner" onClick={this.toggleDropdown}>
          <i className="acf-mini-cart__icon"/>
          <div className="acf-mini-cart__count">
            {count}
          </div>
        </div>
        {
          count > 0 && showDropdown && (
            <div className="acf-mini-cart-dropdown">
              <div className="acf-mini-cart-dropdown__count">
                {count} Item{productsArray.length > 1 && 's'}
              </div>
              <div className="acf-mini-cart-dropdown__products">
                {
                  productsArray.map(sku => {
                    return (
                      <ProductInCart key={sku} sku={sku}
                                     product={cartProducts[sku]}
                                     productDetails={productState.productList[sku]}
                                     removeFromCart={removeFromCart}
                      />
                    )
                  })
                }
              </div>
              <div className="acf-mini-cart-dropdown-total">
                <span className="acf-mini-cart-dropdown-total__label">Sub-total:</span>
                <span className="acf-mini-cart-dropdown-total__value">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="acf-mini-cart-dropdown__actions">
                <a className="acf-mini-cart-dropdown-button" href={ACF_PATH_CART}>View Bag</a>
                <a className="acf-mini-cart-dropdown-button acf-mini-cart-dropdown-button__primary"
                   href={ACF_PATH_CHECKOUT}>Checkout</a>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

function mapStateToProps ({cartState, productState}) {
  return {cartState, productState}
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    {removeFromCart},
    dispatch
  )
}

const MiniCartWithStore = connect(mapStateToProps, mapDispatchToProps)(MiniCart)

ReactDOM.render(
  withAcfStore(MiniCartWithStore),
  document.getElementById(ACF_ID_MINI_CART)
)
