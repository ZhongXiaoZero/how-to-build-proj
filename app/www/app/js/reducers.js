'use strict'

import {BLOGNUM} from './actions'

/**
 * 博客
 * redux db
 * @param state
 * @param action
 * @returns {*}
 */

 export const blog = (state = {}, action) => {
 	switch (action.type) {
 		case BLOGNUM:
 			return Object.assgin({}, state, action.data)
 		default:
 			return state
 	}
 }