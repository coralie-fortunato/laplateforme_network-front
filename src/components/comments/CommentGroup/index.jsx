import React, { useState } from 'react'
import ErrorPage from '../../../pages/ErrorPage'
import { commentPost } from '../../../services/Api/requests'
import Comment from '../comments/Comment/index'
import FormNewComment from '../../forms/FormNewComment/index'
import LoaderSpinnerMini from '../../LoaderSpinnerMini'

const CommentGroup = ({
	idPost,
	baseKey,
	comments,
	setComments,
	removeComment,
}) => {
	const [status, setStatus] = useState(200)
	const [newComment, setNewComment] = useState({
		content: '',
		id_post: idPost,
	})
	const handleInput = (event) => {
		setNewComment({ ...newComment, content: event.target.value })
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		setStatus('loading')
		if (newComment.content !== '' && newComment.id_post) {
			const { data, status } = await commentPost(newComment)
			if (status === 200) {
				setComments(data)
			}
			setStatus(status)
		}
	}
	return status === 200 ? (
		<div className='col p-0'>
			{comments?.length > 0 ? (
				comments.map((comment) => {
					let { id, content, created_at, id_user } = comment

					return (
						<Comment
							key={`${baseKey}-${id}`}
							id={id}
							content={content}
							created_at={created_at}
							id_user={id_user}
							removeComment={(deleted_comment_id) =>
								removeComment(deleted_comment_id)
							}
						/>
					)
				})
			) : (
				<p className='my-4'>Rien pour le moment ...</p>
			)}
			<FormNewComment
				handleInput={handleInput}
				handleSubmit={handleSubmit}
				baseKey={baseKey}
			/>
		</div>
	) : status === 'loading' ? (
		<LoaderSpinnerMini style={{ height: '100vh' }} />
	) : (
		<ErrorPage status={status} style={{ height: '100%' }} />
	)
}
export default CommentGroup
