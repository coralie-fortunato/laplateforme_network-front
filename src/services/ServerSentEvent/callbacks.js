const updateFeedContentFromStream = async (
	event,
	feedContent,
	setFeedContent,
	current_user_id
) => {
	const streamData = JSON.parse(event.data)
	if (streamData.length > 0 && feedContent.feed_content) {
		const udpated_post = feedContent.feed_content.data.find(
			(post) => post.id === streamData[0].id
		)
		if (udpated_post) {
			setFeedContent({
				...feedContent,
				feed_content: {
					...feedContent.feed_content,
					data: [...feedContent.feed_content.data],
				},
			})
		}
	}
}
const initStream = () => console.log('event stream connection made')

export { updateFeedContentFromStream, initStream }
