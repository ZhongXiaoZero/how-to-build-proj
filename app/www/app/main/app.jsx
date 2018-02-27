'use strict'

import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'react-redux'
import store from '../js/store'
import App from '../components/app'

import 'responsive'
import 'console-info'

ReactDom.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
);
