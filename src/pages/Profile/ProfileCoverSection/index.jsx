import React from 'react'
import API_BASE_URL from '../../../services/config/index'
import ProfileAvatar from '../ProfileAvatar/index'
import { useSelector } from 'react-redux'
import NavigationImageInformation from '../NavigationImageInformations/index'

const ProfileCoverSection = ({ data: { id, cover, avatar }, isAmmendable }) => {
	const current_user = useSelector((state) => state.current_user)
	return (
		<>
			<div
				className='col-12 my-2 d-flex flex-column justify-content-center align-items-center rounded relative'
				style={{ minHeight: '50vh' }}
			>
				<img
					src={`${API_BASE_URL}/images/${cover}`}
					className={`img-fluid rounded`}
					alt=''
				/>

				<ProfileAvatar
					user_id={id}
					avatar={avatar}
					style={{
						position: 'absolute',
						bottom: '4rem',
						height: '18rem',
						width: '18rem',
					}}
				/>

				{isAmmendable && (
					<NavigationImageInformation
						current_user={current_user}
						className='row col-12 flex-column p-4 d-none d-lg-flex'
						style={{ position: 'absolute', top: '0' }}
					/>
				)}
			</div>

			{isAmmendable && (
				<NavigationImageInformation
					current_user={current_user}
					className='row col-12 flex-column p-4 d-flex d-md-none'
				/>
			)}
		</>
	)
}

export default ProfileCoverSection
