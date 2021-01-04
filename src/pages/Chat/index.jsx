import React, { useEffect, useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import WEBSOCKET_CLIENT from '../../services/WebSocketClient/index'
import { appendNewMessage } from '../../services/WebSocketClient/callbacks'
import { getChats } from '../../services/Api/requests'
import Modal from '../../components/Modal'
import FormNewChat from '../../components/forms/FormNewChat'
import LoaderSpinner from '../../components/LoaderSpinner/index'
import ErrorPage from '../ErrorPage/index'
import ChatLargeScreen from './ChatLargeScreen'
import ChatSmallScreen from './ChatSmallScreen'
import './index.scss'

const Chat = () => {
	const [screenSize, setScreenSize] = useState(
		window.innerWidth <= 1200 ? 'small' : 'large'
	)
	const chatSectionContainerRef = useRef()
	const currentChatRef = useRef()
	const [currentChat, setCurrentChat] = useState(null)
	const [status, setStatus] = useState('loading')
	const [chats, setChats] = useState([])
	const [isModalDisplayed, setModalDisplayed] = useState(false)
	const [reloadChats, setReloadChats] = useState(0)
	const [currentScreen, setCurrentScreen] = useState('currentChat')
	const handleClick = (event) => {
		event.preventDefault()
		setModalDisplayed(true)
	}

	useEffect(() => {
		const handleScreenResize = () => {
			window.innerWidth <= 1200
				? setScreenSize('small')
				: setScreenSize('large')
		}
		window.addEventListener('resize', handleScreenResize)
	}, [])

	useEffect(() => {
		if (currentChat) {
			WEBSOCKET_CLIENT.onopen = function () {
				console.log('WebSocket Client Connected')
			}
			WEBSOCKET_CLIENT.onmessage = async (newMessage) =>
				await appendNewMessage(
					newMessage,
					setCurrentChat,
					setReloadChats,
					currentChat,
					currentChatRef,
					chats,
					reloadChats
				)
		}
	}, [currentChat])

	useEffect(() => {
		const fetchChats = async () => {
			const { data, status } = await getChats()
			if (status === 200) {
				setChats(data)
			}
			setStatus(status)
		}
		fetchChats()
	}, [reloadChats])

	return status === 200 ? (
		<>
			{screenSize === 'large' ? (
				<ChatLargeScreen
					currentChat={currentChat}
					setCurrentChat={setCurrentChat}
					currentScreen={currentScreen}
					setCurrentScreen={setCurrentScreen}
					chats={chats}
					chatSectionContainerRef={chatSectionContainerRef}
					currentChatRef={currentChatRef}
					handleClick={handleClick}
				/>
			) : (
				<ChatSmallScreen
					currentChat={currentChat}
					setCurrentChat={setCurrentChat}
					currentScreen={currentScreen}
					setCurrentScreen={setCurrentScreen}
					chats={chats}
					chatSectionContainerRef={chatSectionContainerRef}
					currentChatRef={currentChatRef}
					handleClick={handleClick}
				/>
			)}

			{isModalDisplayed &&
				ReactDOM.createPortal(
					<Modal
						component={FormNewChat}
						setModalDisplayed={setModalDisplayed}
						setCurrentChat={setCurrentChat}
						setChats={setChats}
						currentChatRef={currentChatRef}
					/>,
					chatSectionContainerRef.current
				)}
		</>
	) : status === 'loading' ? (
		<LoaderSpinner style={{ height: '100vh' }} />
	) : (
		<ErrorPage status={status} style={{ height: '100vh' }} />
	)
}

export default Chat
