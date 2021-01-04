import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import navbar_brand from './icons/navbar_brand.png'

const Navigation = ({ chatSectionContainerRef }) => {
	const current_user = useSelector((state) => state.current_user)

	return (
		<ul className='nav flex-column col-12'>
			<Link
				to='/feed'
				className='navbar-brand d-none d-lg-block'
				style={{ fontSize: '2rem', padding: '.5rem 1rem' }}
			>
				<img src={navbar_brand} alt='' />
			</Link>
			<li className='nav-item my-2'>
				<Link
					to='/feed'
					className='nav-link active text-dark'
					style={{ fontSize: '2rem' }}
				>
					Mon mur
				</Link>
			</li>
			<li className='nav-item my-2'>
				<Link
					to={`/users/${current_user.id}`}
					className='nav-link text-dark'
					style={{ fontSize: '2rem' }}
				>
					Mon profil
				</Link>
			</li>
		</ul>
	)
}

export default Navigation
