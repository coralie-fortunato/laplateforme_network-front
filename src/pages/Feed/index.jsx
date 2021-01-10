import React, { useState, useEffect, useRef } from 'react'
import FormCreatePost from '../../components/forms/FormCreatePost/index'
import PostMedium from '../../components/posts/posts/PostMedium/index'
import Navbar from '../../components/navbar/Navbar/index'
import PostGroup from '../../components/posts/PostGroup/index'
import ActionBar from '../../components/ActionBar/index'
import { getFeedContent, getUsers } from '../../services/Api/requests'
import { useSelector } from 'react-redux'
import LoaderSpinner from '../../components/LoaderSpinner'
import ErrorPage from '../ErrorPage'
import ProfileAvatar from '../Profile/ProfileAvatar/index'
import eventStream from '../../services/ServerSentEvent'
import {
	updateFeedContentFromStream,
	initStream,
} from '../../services/ServerSentEvent/callbacks'

const Feed = () => {
	const [status, setStatus] = useState('loading')
	const current_user = useSelector((state) => state.current_user)
	const [feedContent, setFeedContent] = useState([])
	const [users, setUsers] = useState([])
	const modalTargetRef = useRef(null)
	useEffect(() => {
		const fetchData = async (current_user_id) => {
			const {
				data: feed_content,
				status: status_feed_content,
			} = await getFeedContent(current_user_id)
			const { data: users, status: status_user } = await getUsers()
			if (status_feed_content === 200 && status_user) {
				setFeedContent(feed_content)
				setUsers(users)
				setStatus(200)
				eventStream.onopen = () => initStream()
				eventStream.onmessage = async (event) =>
					await updateFeedContentFromStream(
						event,
						feed_content,
						setFeedContent,
						current_user_id
					)
			} else {
				status_feed_content !== 200 && setStatus(status_feed_content)
				status_user !== 200 && setStatus(status_user)
			}
		}
		current_user && fetchData(current_user.id)
	}, [current_user])

	return status === 200 ? (
		<>
			<Navbar
				modalTarget={modalTargetRef}
				setFeedContent={setFeedContent}
				feedContent={feedContent}
			/>
			<section
				className='py-4 bg-light'
				id='feed-container'
				ref={modalTargetRef}
			>
				<div className={`col-12`}>
					<div className='row'>
						<div className='col-xl-4 d-none d-xl-block my-5'>
							<h2 className='my-5 text-center'>Les ptits nouveaux ...</h2>
							{users &&
								users.data.map((user) => (
									<ProfileAvatar
										user_id={user.id}
										key={`user-${user.id}`}
										avatar={user.avatar}
										email={user.email}
										style={{
											marginTop: '2rem',
											marginBottom: '2rem',
											marginLeft: 'auto',
											marginRight: 'auto',
											height: '18rem',
											width: '18rem',
										}}
									/>
								))}
						</div>
						<div className='col-xl-8 col-12 my-5'>
							<h2 className='my-5 text-center'>
								L&apos;actu des Plateformeurs ...
							</h2>
							<FormCreatePost
								modalTarget={modalTargetRef}
								setNewPost={(newPost) =>
									setFeedContent({
										...feedContent,
										feed_content: {
											...feedContent.feed_content,
											data: [...feedContent.feed_content.data, newPost],
										},
									})
								}
							/>
							{feedContent && (
								<PostGroup
									baseKey={'feed-posts'}
									postCard={PostMedium}
									setFeedContent={setFeedContent}
									feedContent={feedContent}
								/>
							)}
						</div>
					</div>
				</div>
				<ActionBar modalTarget={modalTargetRef} />
			</section>
		</>
	) : status === 'loading' ? (
		<LoaderSpinner
			style={{
				height: '100vh',
				overflow: 'hidden',
			}}
		/>
	) : (
		<ErrorPage status={status} style={{ minHeight: '100vh' }} />
	)
}

export default Feed
