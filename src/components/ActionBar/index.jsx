import React from 'react'
import AddPost from './icons/navbar_add_post.png'
import Chat from './icons/navbar_chat.png'
import Account from './icons/navbar_account.png'
import './index.scss'

const ActionBar = () => {
	return (
		<ul className='nav bg-light col-12 p-2' id='navigation-action'>
			<li className='nav-item'>
				<img src={AddPost} alt='rediger un post' />
			</li>
			<li className='nav-item'>
				<img src={Chat} alt='accéder au chat' />
			</li>
			<li className='nav-item'>
				<img src={Account} alt='Mon compte' />
			</li>
		</ul>
	)
}
export default ActionBar
