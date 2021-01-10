import React, { useState } from 'react'
import Pulse from 'react-reveal/Pulse'
import { useSelector } from 'react-redux'
import { getFeedContent, searchPosts } from '../../../services/Api/requests'

const PostGroup = ({
	baseKey,
	feedContent,
	setFeedContent,
	postCard: PostCard,
}) => {
	const current_user = useSelector((state) => state.current_user)
	const [isNextPageAvailable, setIsNextPageAvailable] = useState(true)

	const handleClick = async () => {
		if (feedContent.feed_content.next.match(/users/)) {
			const { data, status } = await getFeedContent(
				current_user.id,
				feedContent.feed_content.next
			)
			if (status === 200) {
				if (data.feed_content.data.length > 0) {
					setFeedContent({
						...feedContent,
						feed_content: {
							data: [
								...feedContent.feed_content.data,
								...data.feed_content.data,
							],
							next: data.feed_content.next,
							previous: data.feed_content.previous,
						},
					})
				} else {
					setIsNextPageAvailable(false)
				}
			}
		} else {
			const { data, status } = await searchPosts(
				null,
				feedContent.feed_content.next
			)

			status === 200 &&
				setFeedContent({
					...feedContent,
					feed_content: {
						data: [...feedContent.feed_content.data, ...data.data],
						next: data.next,
						previous: data.previous,
					},
				})
		}
	}

	return (
		<>
			{feedContent?.feed_content?.data?.map((post) => {
				let { id } = post
				return (
					<Pulse key={`pulse-${baseKey}-${id}`}>
						<PostCard
							key={`${baseKey}-${id}`}
							id={id}
							feedContent={feedContent}
						/>
					</Pulse>
				)
			})}
			<div className='row d-flex justify-content-center align-items-center p-4'>
				{isNextPageAvailable ? (
					<button
						onClick={handleClick}
						className='btn btn-lg col-12 col-lg-4 btn-outline-dark'
					>
						voir plus
					</button>
				) : (
					<p style={{ fontSize: '2rem' }}>
						Rien d&apos;autre pour le moment...
					</p>
				)}
			</div>
		</>
	)
}

export default PostGroup
