import { types } from 'acf/constants'

export const addToCart = ({sku, color, size, qty, price}) => ({
  type: types.ADD_TO_CART,
  payload: {sku, color, size, qty, price}
})

export const updateInCart = (sku, qty, price) => ({
  type: types.UPDATE_IN_CART,
  payload: {sku, qty, price}
})

export const removeFromCart = (sku, qty, price) => ({
  type: types.REMOVE_FROM_CART,
  payload: {sku, qty, price}
})
