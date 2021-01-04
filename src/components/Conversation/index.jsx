import React from 'react'
import { getChat } from '../../services/Api/requests'

const Conversation = ({
	data,
	setCurrentChat,
	currentChatRef,
	setCurrentScreen,
}) => {
	const handleClick = async () => {
		const { data: messages, status } = await getChat(data.id)
		if (status === 200) {
			setCurrentChat({ ...data, messages })
			setCurrentScreen && setCurrentScreen()
			currentChatRef.current.scroll({
				top: currentChatRef.current.scrollTopMax,
				behavior: 'smooth',
			})
		}
	}
	return (
		<div className='row col-12 p-4 rounded border bg-white my-4 mx-auto'>
			<div className='col-8'>
				<p style={{ fontSize: '1.5rem' }} className='text-muted'>
					{data.message_count} messages
				</p>
				<p style={{ fontSize: '1.5rem' }} className='text-muted'>
					{data.subscriber_count} membres
				</p>
			</div>

			<div className='col-4 d-flex align-items-center justify-content-center'>
				<div className='rounded-circle shadow-sm p-3'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						fill='#6c757d'
						className='bi bi-chevron-right'
						viewBox='0 0 16 16'
						onClick={handleClick}
						style={{ cursor: 'pointer' }}
					>
						<path
							fillRule='evenodd'
							d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'
						/>
					</svg>
				</div>
			</div>
		</div>
	)
}
export default Conversation
