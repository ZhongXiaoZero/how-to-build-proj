'use strict'

import {combineReducers} from 'redux'
import * as reducers from './reducers'
import * as commonReducers from 'common-reducers.js'
import createStore from 'create-store'

let _reducers = Object.assign(reducers, commonReducers)
let todoApp = combineReducers(_reducers)

export default createStore(todoApp)