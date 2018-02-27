'use strict'

import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
let middlewareArgs = [thunkMiddleware]
if (__DEV__) {
    let createLogger = require('redux-logger')
    const loggerMiddleware = createLogger()
    middlewareArgs.push(loggerMiddleware)
}

const createStoreWithWiddleware = applyMiddleware(
    ...middlewareArgs
)(createStore)

export default createStoreWithWiddleware
