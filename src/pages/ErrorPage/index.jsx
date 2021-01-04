import React from 'react'
import error500 from './errors/error_500.jpg'
import error401 from './errors/error_401.jpg'
import error403 from './errors/error_403.jpg'
import error404 from './errors/error_404.jpg'
import error422 from './errors/error_422.jpg'

const ErrorPage = ({ status, style = {}, component: Component }) => {
	const errors = {
		401: error401,
		403: error403,
		404: error404,
		422: error422,
		500: error500,
	}
	return (
		<div
			className='container d-flex flex-column justify-content-center align-items-center'
			style={{ ...style }}
		>
			<img src={errors[status]} className='img-fluid' alt='' />

			{Component && <Component />}
		</div>
	)
}

export default ErrorPage
