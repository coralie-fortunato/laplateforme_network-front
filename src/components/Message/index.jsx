import React from 'react'
import { useHistory } from 'react-router-dom'
import parseDate from '../../helpers/parseDate'
import ProfileAvatar from '../../pages/Profile/ProfileAvatar/index'
import './index.scss'

const Message = ({
	message_id,
	message_created_at,
	message_content,
	user_id,
	user_email,
	user_avatar,
	user_firstname,
	user_lastname,
}) => {
	const history = useHistory()
	return (
		<div className='m-4'>
			<div className='message shadow-sm'>
				<div className='row d-flex'>
					<p className='text-muted text-right align-self-end ml-2'>
						le {parseDate(message_created_at)}
					</p>
				</div>

				<hr />

				<p style={{ fontSize: '1.5rem' }}>{message_content}</p>
			</div>

			<ProfileAvatar
				style={{
					height: '4rem',
					width: '4rem',
					marginTop: '1rem',
					marginBottom: '1rem',
					cursor: 'pointer',
				}}
				title={user_email}
				avatar={user_avatar}
				onClick={() => history.push(`/users/${user_id}`)}
			/>
		</div>
	)
}

export default Message
