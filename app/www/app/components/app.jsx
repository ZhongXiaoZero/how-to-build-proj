'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'

class App extends Component {
	constructor(obj) {
		super(obj)
		this.state = {}
	}

	componentWillMount() {

	}

	componentWillReceiveProps(nextprops) {

	}

	componentWillUpdate(nextProps, nextState) {

	}

	render() {
		return (
			<div className='blog-content'>
				这是新的开始
			</div>
		)
	}
}

export default connect(state => {
	return state
})(App)