import React, {Component} from 'react'
import config from './config.json'
import './style.css'

class App extends Component {
	render() {
		return (
			<div className="root">
				{config.change}
			</div>
		)
	}
}

export default App