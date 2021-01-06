import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import AddPost from './icons/navbar_add_post.png'
import Chat from './icons/navbar_chat.png'
import Account from './icons/navbar_account.png'
import './index.scss'
import { useSelector } from 'react-redux'
import FormNewPost from '../forms/FormNewPost/index'
import Modal from '../Modal/index'

const ActionBar = ({ modalTarget }) => {
	const [isModalDisplayed, setModalDisplayed] = useState(false)
	const handleClick = () => {
		setModalDisplayed(true)
	}
	const current_user = useSelector((state) => state.current_user)
	return (
		<>
			<ul className='nav bg-light col-12 p-2' id='navigation-action'>
				<li className='nav-item'>
					<img
						src={AddPost}
						alt='rediger un post'
						onClick={handleClick}
						style={{ cursor: 'pointer' }}
					/>
				</li>
				<li className='nav-item'>
					<Link to='/chat'>
						<img src={Chat} alt='accéder au chat' />
					</Link>
				</li>
				<li className='nav-item'>
					<Link to={`users/${current_user.id}`}>
						<img src={Account} alt='Mon compte' />
					</Link>
				</li>
			</ul>
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
export default ActionBar
