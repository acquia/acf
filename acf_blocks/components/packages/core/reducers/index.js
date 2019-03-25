import { combineReducers } from 'redux'
import cartState from './cartState'
import productState from './productState'

export default combineReducers({
  cartState,
  productState
})
