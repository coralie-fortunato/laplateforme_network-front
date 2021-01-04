import React from 'react'
import Navigation from '../Navigation'
import Conversation from '../../../components/Conversation/index'
import Message from '../../../components/Message'
import IconEmptyResults from '../../../components/icons/IconEmptyResults'
import { Link } from 'react-router-dom'
import FormCreateMessage from '../../../components/forms/FormCreateMessage/index'

const ChatLargeScreen = ({
	currentChat,
	setCurrentChat,
	currentScreen,
	setCurrentScreen,
	chats,
	chatSectionContainerRef,
	currentChatRef,
	handleClick,
}) => {
	return (
		<section
			className='col-12 p-0'
			style={{ minheight: '100vh' }}
			ref={chatSectionContainerRef}
		>
			<div className='row' id='chat-main-row'>
				<div className='col-lg-3 d-none d-lg-block position-relative bg-yellow-color'>
					<Navigation chatSectionContainerRef={chatSectionContainerRef} />
				</div>
				<div className='h-100 col-lg-3 d-none d-lg-block overflow-auto position-relative bg-primary-color'>
					{chats.map((chat) => (
						<Conversation
							key={`chat-${chat.id}`}
							data={chat}
							setCurrentChat={setCurrentChat}
							currentChatRef={currentChatRef}
						/>
					))}
				</div>
				<div
					className='h-100 col-12 col-lg-6 d-block overflow-auto position-relative bg-light p-4'
					ref={currentChatRef}
				>
					{currentChat?.messages.length > 0 ? (
						currentChat?.messages?.map((message) => {
							return <Message key={message.message_id} {...message} />
						})
					) : (
						<IconEmptyResults text='Veuillez sélectionner une conversation existante ou en créer une nouvelle' />
					)}
				</div>
			</div>
			<div className='row' id='chat-action-row'>
				<div className='col-lg-3 d-none d-lg-flex flex-column justify-content-center bg-yellow-color'>
					<div>
						<Link to='/' className='btn btn-lg btn-danger col-12'>
							Deconnexion
						</Link>
					</div>
				</div>
				<div className='col-lg-3 d-none d-lg-flex flex-column justify-content-center bg-primary-color'>
					<div>
						<button
							className='btn btn-lg bg-yellow-color text-dark col-12'
							onClick={handleClick}
						>
							Nouvelle conversation
						</button>
					</div>
				</div>
				<div className='col-12 col-lg-6 d-lg-flex flex-column justify-content-center bg-light'>
					{currentChat && <FormCreateMessage currentChat={currentChat} />}
				</div>
			</div>
		</section>
	)
}

export default ChatLargeScreen
