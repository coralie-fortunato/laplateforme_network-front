import React from 'react'
import Message from '../../../components/Message'
import FormCreateMessage from '../../../components/forms/FormCreateMessage/index'
import IconEmptyResults from '../../../components/icons/IconEmptyResults'
import Conversation from '../../../components/Conversation/index'
import Navigation from '../Navigation'
import IconPrevious from '../../../components/icons/IconPrevious/index'
import Chat from './icons/navbar_chat.png'

const ChatSmallScreen = ({
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
			ref={chatSectionContainerRef}
			className='position-relative'
			style={{ height: '100vh' }}
		>
			<div
				className={`h-100 col-12 d-block overflow-auto bg-light ${
					currentScreen === 'currentChat' ? 'z-500' : 'z-0'
				}`}
				style={{ position: 'absolute', top: 0, left: 0 }}
			>
				<div
					className='col-12 d-flex align-items-center justify-content-between'
					style={{ height: '10vh' }}
				>
					<IconPrevious
						onClick={() => setCurrentScreen('chats')}
						title='revenir aux conversations'
					/>
					<img
						src={Chat}
						alt='nouvelle conversation'
						title='nouvelle conversation'
						onClick={handleClick}
						style={{ cursor: 'pointer' }}
					/>
				</div>
				{currentChat?.messages.length > 0 ? (
					<>
						<div
							className='col-12 p-0 d-block overflow-auto'
							style={{ height: '70vh' }}
							ref={currentChatRef}
						>
							{currentChat?.messages?.map((message) => {
								return <Message key={message.message_id} {...message} />
							})}
						</div>

						<div
							className='col-12 p-0 d-flex align-items-center justify-content-center'
							style={{ height: '20vh' }}
						>
							{currentChat && <FormCreateMessage currentChat={currentChat} />}
						</div>
					</>
				) : (
					<IconEmptyResults text='Veuillez sélectionner une conversation existante ou en créer une nouvelle' />
				)}
			</div>
			<div
				className={`h-100 col-12 d-block overflow-auto bg-primary-color p-4 h-screen ${
					currentScreen === 'chats' ? 'z-500' : 'z-0'
				}`}
				style={{ position: 'absolute', top: 0, left: 0 }}
			>
				{chats.map((chat) => (
					<Conversation
						key={`chat-${chat.id}`}
						data={chat}
						setCurrentChat={setCurrentChat}
						currentChatRef={currentChatRef}
						setCurrentScreen={() => setCurrentScreen('currentChat')}
					/>
				))}
			</div>
			<div
				className={`h-100 col-12 d-block overflow-auto bg-primary-color p-4 h-screen ${
					currentScreen === 'menu' ? 'z-500' : 'z-0'
				}`}
				style={{ position: 'absolute', top: 0, left: 0 }}
			>
				<Navigation chatSectionContainerRef={chatSectionContainerRef} />
			</div>
			)
		</section>
	)
}

export default ChatSmallScreen
