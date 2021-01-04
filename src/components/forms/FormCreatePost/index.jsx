import React, { useState } from 'react'
import Pen from './icons/pen.png'
import Modal from '../../Modal/index'
import ReactDOM from 'react-dom'
import FormNewPost from '../FormNewPost'
import './index.scss'

const FormCreatePost = ({ modalTarget, setNewPost }) => {
	const [isModalDisplayed, setModalDisplayed] = useState(false)
	const handleFocus = () => {
		setModalDisplayed(true)
	}

	return (
		<>
			<form
				className='form-inline col-12 col-md-9 my-5 mx-auto'
				id='nav-search'
				method='POST'
				action=''
			>
				<div className='relative col-12'>
					<input
						className='form-control form-control-lg w-100 rounded-pill'
						type='search'
						placeholder='Une belle histoire commence ici...'
						aria-label='Search'
						onFocus={handleFocus}
					/>
					<img
						src={Pen}
						className='absolute-right d-none d-lg-block'
						alt='search on Laplateforme_ icon'
					/>
				</div>
			</form>
			{isModalDisplayed &&
				ReactDOM.createPortal(
					<Modal
						component={FormNewPost}
						setModalDisplayed={setModalDisplayed}
						setNewPost={setNewPost}
					/>,
					modalTarget.current
				)}
		</>
	)
}

export default FormCreatePost
