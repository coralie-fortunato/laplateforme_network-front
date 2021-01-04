import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { sendMessageInNewConversation } from '../../../services/WebSocketClient/callbacks'
import AutocompleteSubscribers from './AutocompleteSubscribers'
import IconMinus from '../../icons/IconMinus/index'
import './index.scss'
import IconClose from '../../icons/IconClose/index'

const FormNewChat = ({
	setCurrentChat,
	setChats,
	currentChatRef,
	setModalDisplayed,
}) => {
	const current_user = useSelector((state) => state.current_user)
	const [selectedSubscribers, setSelectedSubscribers] = useState([])
	const [content, setContent] = useState('Votre message commence ici...')
	const [isAutocompleActive, setAutocompleteActive] = useState(false)
	const handleInput = (event) => {
		setContent(event.target.value)
	}

	const handleRemoveSelectedSubscriber = (selectedSubscriberId) => {
		setSelectedSubscribers(
			selectedSubscribers.filter(
				(element) => element.id !== selectedSubscriberId
			)
		)
	}
	const handleSetAutocompleteNotActive = (event) => {
		if (
			Array.from(event.target.classList) &&
			!Array.from(event.target.classList).includes('autocomplete-active')
		) {
			setAutocompleteActive(false)
		}
	}

	const handleSendMessage = async (event) =>
		await sendMessageInNewConversation(
			event,
			current_user,
			selectedSubscribers,
			content,
			setChats,
			setCurrentChat,
			setModalDisplayed,
			currentChatRef
		)

	return (
		<form
			action=''
			className='col-12 col-lg-6 bg-white p-4 block overflow-auto'
			id='form-new-chat'
			onClick={handleSetAutocompleteNotActive}
		>
			<div className='row d-flex justify-content-end'>
				<IconClose onClick={() => setModalDisplayed(false)} />
			</div>
			<h2>Discutez en privée ...</h2>
			<hr className='mb-4' />

			<div className='form-group' style={{ minHeight: '10rem' }}>
				<label>Correspondant séléctionnés : </label>
				<div className='row d-flex flex-wrap p-2'>
					{selectedSubscribers.map((selectedSubscriber) => (
						<span
							key={`selected-subscriber-${selectedSubscriber.id}`}
							id={`selected-subscriber-${selectedSubscriber.id}`}
							className='badge badge-pill badge-primary p-2 m-1 d-flex align-items-center'
						>
							<p className='mr-2 my-0'>{selectedSubscriber.email}</p>
							<IconMinus
								onclick={() =>
									handleRemoveSelectedSubscriber(selectedSubscriber.id)
								}
								fillColor='#FFFF'
							/>
						</span>
					))}
				</div>
			</div>

			<h5>Nouvelle conversation</h5>

			<AutocompleteSubscribers
				setSelectedSubscribers={setSelectedSubscribers}
				selectedSubscribers={selectedSubscribers}
				isAutocompleActive={isAutocompleActive}
				setAutocompleteActive={setAutocompleteActive}
			/>

			<div className='form-group'>
				<label htmlFor='message_content'>Redigez votre message :</label>
				<textarea
					name='message_content'
					id='message_content'
					rows='10'
					className='form-control p-2'
					onInput={handleInput}
					value={content}
				></textarea>
			</div>

			<button
				type='submit'
				onClick={handleSendMessage}
				className='btn btn-lg btn-success col-12 my-4'
			>
				envoyer
			</button>
		</form>
	)
}

export default FormNewChat
