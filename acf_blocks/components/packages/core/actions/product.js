import { types } from 'acf/constants'

export const fetchProduct = sku => ({
    type: types.FETCH_PRODUCT,
    payload: {
      client: 'default',
      request: {
        url: `/product-${sku}`,
      }
    }
  }
)
