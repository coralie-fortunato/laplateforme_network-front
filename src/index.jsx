import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { Provider } from 'react-redux'
import store from './store/store'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/main.scss'
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#root')
)
