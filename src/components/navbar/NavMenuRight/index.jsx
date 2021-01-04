import React from 'react'
import NavbarAvatarIcon from './icons/navbar_avatar.png'
import NavbarChatIcon from './icons/navbar_chat.png'
import NavbarAddPostIcon from './icons/navbar_add_post.png'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const NavMenuRight = ({ onClick }) => {
	const current_user = useSelector((state) => state.current_user)
	return (
		<ul className='navbar-nav ml-auto d-none d-lg-flex'>
			<li className='nav-item'>
				<div className='relative d-flex align-items-center justify-content-center'>
					<img src={NavbarAvatarIcon} alt='navbar avatar icon' />

					<Link
						to={`/users/${current_user.id}`}
						style={{ position: 'absolute', margin: '0' }}
						className='font-weight-bold text-decoration-none text-dark'
					>
						{current_user?.email[0].toUpperCase()}
					</Link>
				</div>
			</li>
			<li className='nav-item'>
				<img
					src={NavbarAddPostIcon}
					alt='navbar add icon'
					onClick={onClick}
					style={{ cursor: 'pointer' }}
				/>
			</li>
			<li className='nav-item'>
				<Link to='/chat'>
					<img src={NavbarChatIcon} alt='navbar chat icon' />
				</Link>
			</li>
		</ul>
	)
}
export default NavMenuRight
