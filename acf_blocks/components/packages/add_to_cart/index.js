import React from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withAcfStore } from 'acf'
import { ACF_ID_ADD_TO_CART } from 'acf/constants'
import { addToCart, fetchProduct } from 'acf/actions'
import FormSelect from 'acf/utils/FormSelect'

class AddToCart extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      id: props.settings.id,
      sku: props.settings.sku,
      color: null,
      size: null,
      qty: null
    }
  }

  componentDidMount () {
    this.props.fetchProduct(this.state.sku)
  }

  shouldComponentUpdate (nextProps) {
    return !!nextProps.productList[this.state.sku]
  }

  selectVariantHandler = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  addToCartHandler = () => {
    let {sku, color, size, qty} = this.state
    let {colors, sizes, inventory, price} = this.props.productList[this.state.sku]

    // Use first value of properties by default
    !color && (color = colors[0])
    !size && (size = sizes[0])
    !qty && inventory > 0 && (qty = 1)

    this.props.addToCart({sku, color, size, qty, price})
  }

  render () {
    if (!this.props.productList[this.state.sku]) {
      return null
    }

    let {colors, sizes, inventory} = this.props.productList[this.state.sku]

    return (
      <div className="acf-add-to-cart">
        <div className="acf-add-to-cart__inner">
          <ul className="acf-add-to-cart__variants-list">
            <Variant label={'Color'}>
              <FormSelect onChange={evt => this.selectVariantHandler('color', evt.target.value)}
                          options={colors}/>
            </Variant>

            <Variant label={'Size'}>
              <FormSelect onChange={evt => this.selectVariantHandler('size', evt.target.value)}
                          options={sizes}/>
            </Variant>

            <Variant label={'Qty'}>
              <FormSelect onChange={evt => this.selectVariantHandler('qty', +evt.target.value)}
                          options={[...Array(inventory).keys()].map(n => ++n)}/>
            </Variant>
          </ul>

          <button className="acf-add-to-cart__button" type='button'
                  onClick={this.addToCartHandler}>
            <i className="acf-add-to-cart__icon"/>
            <span className="acf-add-to-cart__label">{'Add to cart'}</span>
          </button>
        </div>
      </div>
    )
  }
}

function Variant ({label, children}) {
  return (
    <li>
      <label className="acf-add-to-cart__variant">
        <b className="acf-add-to-cart__variant-label">{label}</b>
        <div className="acf-add-to-cart__variant-options">
          {children}
        </div>
      </label>
    </li>
  )
}

function mapStateToProps ({productState}) {
  return {...productState}
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    {addToCart, fetchProduct},
    dispatch
  )
}

const AddToCartWithStore = connect(mapStateToProps, mapDispatchToProps)(AddToCart)

ReactDOM.render(
  withAcfStore(AddToCartWithStore),
  document.getElementById(ACF_ID_ADD_TO_CART)
)
