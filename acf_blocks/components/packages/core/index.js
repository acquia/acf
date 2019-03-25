import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import axios from 'axios'
import { multiClientMiddleware } from 'redux-axios-middleware'
import { ACF_PATH_DRUPAL_API, ACF_STORE_NAME } from './constants'
import { saveState, loadState } from './utils/persistStore'
import rootReducer from './reducers'

const apiClients = {
  default: {
    client: axios.create({
      baseURL: ACF_PATH_DRUPAL_API,
      responseType: 'json',
    })
  }
}

const initCreateStore = (initialState = {}) => {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(
        multiClientMiddleware(apiClients),
        thunkMiddleware
      )
    )
  )
}

if (!window[ACF_STORE_NAME]) {
  const persistedState = loadState(ACF_STORE_NAME)
  window[ACF_STORE_NAME] = initCreateStore(persistedState)

  window[ACF_STORE_NAME].subscribe(() => {
    saveState(ACF_STORE_NAME, window[ACF_STORE_NAME].getState())
  })
}

const settings = drupalSettings.acf_blocks !== undefined && drupalSettings.acf_blocks.product !== undefined
  ? {
      sku: drupalSettings.acf_blocks.product.sku,
      id: drupalSettings.acf_blocks.product.id
    }
  : null

export const withAcfStore = Component => (
  <Provider store={window[ACF_STORE_NAME]}>
    <Component settings={settings}/>
  </Provider>
)

export default withAcfStore
