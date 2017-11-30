import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store'

import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
