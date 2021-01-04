import React, { useRef } from 'react'
import './index.scss'

const Modal = ({ component: Component, setModalDisplayed, ...rest }) => {
	const modalRef = useRef(null)
	const handleClick = (event) => {
		event.target.id === 'modal' && setModalDisplayed(false)
	}
	return (
		<div
			className='col-12 p-0 d-flex justify-content-center align-items-center'
			style={{
				position: 'fixed',
				zIndex: ' 50000',
				top: '0',
				height: '100vh',
				backgroundColor: 'rgba(127, 127, 127, .5)',
			}}
			onClick={handleClick}
			ref={modalRef}
			id='modal'
		>
			<Component {...rest} setModalDisplayed={setModalDisplayed} />
		</div>
	)
}

export default Modal
