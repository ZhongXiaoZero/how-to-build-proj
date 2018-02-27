'use strict'

import {fetchErr} from 'common-actions'
import {post,get} from 'http'

export const BLOGNUM = 'BLOGNUM'

/**
 *获取博客详情
 * @returns {Function}	
 */	
export const getBlogInfo = (data) => {
	return (dispatch) => {
		let errData = {}
		get('/api/blog',data)
			.then(req => req.json())
			.then(json=>{
				//信息处理
			})
	}
}

export const blogInfo = (data) => {
	return {
		type: BLOGNUM,
		data
	}
}