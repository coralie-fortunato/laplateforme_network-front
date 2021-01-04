import React from 'react'
import ListGroup from '../../../components/lists/ListGroup/index'

const ProfileSection = ({ sectionHeader, data, itemType, isAmmendable }) => {
	return (
		<div
			className='col-12 my-4 d-block overflow-auto'
			style={{ maxHeight: '100vh' }}
		>
			<h2 className='my-2'>{sectionHeader}</h2>
			{data && data.length > 0 ? (
				<ListGroup
					items={data}
					itemType={itemType}
					isAmmendable={isAmmendable}
				/>
			) : (
				<div className='col d-flex flex-column py-4 bg-light'>
					<p>Rien pour le moment</p>
				</div>
			)}
		</div>
	)
}

export default ProfileSection
