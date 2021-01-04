import React from 'react'
import loading from './img/loading.png'

const LoaderSpinner = ({ style = {} }) => {
	return (
		<div
			className='d-flex flex-column align-items-center justify-content-center'
			style={{
				...style,
				backgroundImage: `url(${loading})`,
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'contain',
			}}
		>
			<div
				className='spinner-border text-primary'
				role='status'
				aria-hidden='true'
				style={{ width: '4rem', height: '4rem' }}
			></div>
			<strong className='my-4'>Chargement...</strong>
		</div>
	)
}

export default LoaderSpinner
