import { types } from 'acf/constants'

export const initialState = {
  cartProducts: {},
  count: 0,
  totalPrice: 0
}

export default (state = initialState, {type, payload = {}}) => {
  let products = state.cartProducts
  let {sku, qty, color, size, price} = payload
  let productsPrice = price * qty

  switch (type) {
    case types.ADD_TO_CART:
      return {
        ...state,
        cartProducts: {
          ...products,
          [sku]: {color, size, qty}
        },
        count: state.count - (products[sku] ? products[sku].qty : 0) + qty,
        totalPrice: state.totalPrice + productsPrice
      }

    case types.UPDATE_IN_CART:
      return {
        ...state,
        cartProducts: {
          ...products,
          [sku]: {
            ...products[sku],
            qty
          }
        },
        count: state.count - products[sku].qty + qty,
        totalPrice: state.totalPrice - products[sku].qty * price + productsPrice
      }

    case types.REMOVE_FROM_CART:
      const remained = {...products}
      delete remained[sku]

      return {
        ...state,
        cartProducts: {...remained},
        count: state.count - qty,
        totalPrice: state.totalPrice - productsPrice
      }

    default:
      return state
  }
}
