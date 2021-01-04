import React from 'react'
import API_BASE_URL from '../../../services/config/index'
import avatarPlaceholder from './avatar_placeholder.jpeg'
import { Link } from 'react-router-dom'

const ProfileAvatar = ({ user_id, avatar, email, style, title, onClick }) => {
	return (
		<>
			<div
				className='rounded-circle shadow d-flex justify-content-center align-items-center p-2 bg-light'
				style={{
					...style,
				}}
				title={title}
				onClick={onClick ? onClick : null}
			>
				<img
					src={avatar ? API_BASE_URL + '/images/' + avatar : avatarPlaceholder}
					alt='user avatar'
					className='rounded-circle'
					style={{ objectFit: 'cover', height: '100%', width: '100%' }}
				/>
			</div>
			{email && (
				<p className='text-center'>
					<Link to={`/users/${user_id}`} className='text-dark'>
						{email}
					</Link>
				</p>
			)}
		</>
	)
}

export default ProfileAvatar
