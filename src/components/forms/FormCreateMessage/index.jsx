import React, { useState } from 'react'
import { createMessage } from '../../../services/Api/requests'
import WEBSOCKET_CLIENT from '../../../services/WebSocketClient/index'

const FormCreateMessage = ({ currentChat }) => {
	const [content, setContent] = useState('')

	const handleInput = (event) => {
		setContent(event.target.value)
	}
	const handleSubmit = async (event) => {
		event.preventDefault()
		const message = {
			subscribers: currentChat.subscriber_ids,
			content,
		}
		const { data, status } = await createMessage(message)
		if (status === 200) {
			WEBSOCKET_CLIENT.send(JSON.stringify(data))
		}
	}
	return (
		<form action='' className='col-12' method='POST' onSubmit={handleSubmit}>
			<div className='row'>
				<div className='col-12 col-lg-10'>
					<textarea
						id='message-post'
						className='form-control'
						rows='1'
						value={content}
						onInput={handleInput}
					></textarea>
				</div>

				<div className='col-12 col-lg-2 d-flex align-items-center'>
					<button className='btn btn-lg btn-success col-12 my-4 my-lg-0'>
						envoyer
					</button>
				</div>
			</div>
		</form>
	)
}

export default FormCreateMessage
