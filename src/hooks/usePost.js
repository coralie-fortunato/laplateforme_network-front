import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
	getPost,
	getReactions,
	likePost,
	unLikePost,
} from '../services/Api/requests'

const usePost = (id) => {
	const current_user = useSelector((state) => state.current_user)
	const [post, setPost] = useState()
	const [isEmojiPickerDisplayed, setEmojiPickerDisplay] = useState(false)
	const [areCommentsDisplayed, setCommentsDisplayed] = useState(false)
	const [status, setStatus] = useState('loading')
	const [reactions, setReactions] = useState([])
	const [links, setLinks] = useState(null)
	const [formattedContent, setFormattedContent] = useState(null)
	const [images, setImages] = useState(null)

	const handleToogleComment = () => {
		setCommentsDisplayed(!areCommentsDisplayed)
	}

	const handleNewPostReaction = (newPostReaction) => {
		setPost({
			...post,
			reactions: [...post.reactions, newPostReaction],
		})
	}
	const handleDisplayEmojiPicker = () => {
		setEmojiPickerDisplay(!isEmojiPickerDisplayed)
	}

	const handleNewComment = (newComment) => {
		setPost({ ...post, comments: [...post.comments, newComment] })
	}

	const handleDeleteComment = (deleted_comment_id) => {
		setPost({
			...post,
			comments: post.comments.filter(
				(comment) => comment.id !== deleted_comment_id
			),
		})
	}

	const handleLike = async (id_post) => {
		if (post) {
			setStatus('loading')
			const like = post.likes.find((like) => like.id_user === current_user.id)
			if (like) {
				const { status } = await unLikePost(like.id)
				if (status === 204) {
					setStatus(200)
					setPost({
						...post,
						likes: post.likes.filter((el) => el.id !== like.id),
					})
				} else {
					setStatus(status)
				}
			} else {
				const { data, status } = await likePost(id_post)
				if (status === 200) {
					setStatus(200)
					setPost({ ...post, likes: [...post.likes, data] })
				} else {
					setStatus(status)
				}
			}
		}
	}

	useEffect(() => {
		const fetchPost = async (post_id) => {
			const { data, status } = await getPost(post_id)
			if (status === 200) {
				setPost(data)
				setStatus(200)
			} else {
				setStatus(status)
			}
		}
		const fetchReaction = async () => {
			const { data, status } = await getReactions()
			if (status === 200) {
				setReactions(data)
				setStatus(200)
			} else {
				setStatus(status)
			}
		}
		fetchReaction()
		fetchPost(id)
	}, [id])

	useEffect(() => {
		post &&
			setFormattedContent(
				post.post.content.replace(
					/(https:\/\/[a-z0-9\S]+)/g,
					"<a href='$1'>lien</a>"
				)
			)
		post && setLinks(post.post.content.match(/https:\/\/[a-z0-9\S]+/g))

		if (post) {
			if (post.post.image_path) {
				try {
					const parsedImages = JSON.parse(post.post.image_path).map(
						(e) => e.image_url
					)
					parsedImages && setImages(parsedImages)
				} catch (error) {
					// console.error(error)
				}
			}
		}
	}, [post])

	return {
		status,
		post,
		areCommentsDisplayed,
		isEmojiPickerDisplayed,
		reactions,
		formattedContent,
		links,
		images,
		handleToogleComment,
		handleDisplayEmojiPicker,
		handleLike,
		handleNewComment: (newComment) => handleNewComment(newComment),
		handleDeleteComment: (deleted_comment_id) =>
			handleDeleteComment(deleted_comment_id),
		handleNewPostReaction: (newPostReaction) =>
			handleNewPostReaction(newPostReaction),
	}
}

export default usePost
