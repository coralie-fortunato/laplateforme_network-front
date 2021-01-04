import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import NavMenuRight from '../NavMenuRight/index'
import NavSearch from '../NavSearch/index'
import ReactDOM from 'react-dom'
import Modal from '../../Modal/index'
import FormNewPost from '../../forms/FormNewPost'
import navbar_brand from './icons/navbar_brand.png'

const Navbar = ({ modalTarget, setFeedContent, feedContent }) => {
	const [isModalDisplayed, setModalDisplayed] = useState(false)
	const handleClick = () => {
		setModalDisplayed(true)
	}
	return (
		<>
			<nav className='navbar navbar-expand-lg navbar-light bg-light fixed-top'>
				<Link to='/feed' className='navbar-brand d-none d-lg-block'>
					<img src={navbar_brand} alt='' />
				</Link>
				{setFeedContent && (
					<NavSearch
						feedContent={feedContent}
						setFeedContent={setFeedContent}
						className='form-inline my-2 my-lg-0 col-lg-5 col-md-10 col-sm-12'
					/>
				)}
				<NavMenuRight onClick={handleClick} />
			</nav>
			{isModalDisplayed &&
				ReactDOM.createPortal(
					<Modal
						component={FormNewPost}
						setModalDisplayed={setModalDisplayed}
					/>,
					modalTarget.current
				)}
		</>
	)
}

export default Navbar
