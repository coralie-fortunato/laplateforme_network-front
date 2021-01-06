import { createMessage, getChat, getChats } from '../Api/requests'
import { WEBSOCKET_CLIENT } from './index'

const appendNewMessage = async (
	newMessage,
	setCurrentChat,
	currentChat,
	currentChatRef
) => {
	const messageData = JSON.parse(newMessage.data)
	if (messageData.message_id_chat === currentChat.id) {
		const { data, status } = await getChat(messageData.message_id_chat)
		if (status === 200) {
			setCurrentChat({ ...currentChat, messages: data })
			currentChatRef.current.scroll({
				top: currentChatRef.current.scrollTopMax,
				behavior: 'smooth',
			})
		}
	}
}

const sendMessageInNewConversation = async (
	event,
	current_user,
	selectedSubscribers,
	content,
	setChats,
	setCurrentChat,
	setModalDisplayed,
	currentChatRef
) => {
	event.preventDefault()
	const subscribers = [
		...selectedSubscribers.map((element) => parseInt(element.id)),
		parseInt(current_user.id),
	]
	const message = {
		subscribers,
		content,
	}
	const { data: newMessage, status: newMessageStatus } = await createMessage(
		message
	)
	if (newMessageStatus === 200) {
		const { data: chats, status: chatsStatus } = await getChats()
		if (chatsStatus === 200) {
			setChats(chats)
		}
		const { data: messages, status: chatStatus } = await getChat(
			newMessage.message_id_chat
		)
		if (chatStatus === 200) {
			setCurrentChat({
				...chats.find((chat) => chat.id === newMessage.message_id_chat),
				messages,
			})
			currentChatRef.current.scroll({
				top: currentChatRef.current.scrollTopMax,
				behavior: 'smooth',
			})
		}

		WEBSOCKET_CLIENT.send(JSON.stringify({ ...newMessage, subscribers }))
		setModalDisplayed(false)
	}
}

export { appendNewMessage, sendMessageInNewConversation }
