import React from 'react'

const LoaderSpinnerMini = ({ style }) => {
	return (
		<div className='d-flex align-items-center justify-content-center'>
			<div
				className='spinner-border text-primary text-center'
				role='status'
				aria-hidden='true'
				style={{ ...style }}
			></div>
		</div>
	)
}

export default LoaderSpinnerMini
