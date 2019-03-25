import { types } from 'acf/constants'

export const initialState = {
  productList: {}
}

export default (state = initialState, {type, payload = {}}) => {
  switch (type) {
    case types.FETCH_PRODUCT_SUCCESS:
      let {sku} = payload.data

      return {
        ...state,
        productList: {
          ...state.productList,
          [sku]: payload.data
        }
      }

    default:
      return state
  }
}
