import React from 'react'
import PostReaction from '../../PostReactions/index'
import IconMinus from '../../../icons/IconMinus/index'
import IconPlus from '../../../icons/IconPlus/index'
import IconLike from '../../../icons/IconLike/index'
import CommentGroup from '../../../comments/CommentGroup/index'
import parseDate from '../../../../helpers/parseDate'
import ErrorPage from '../../../../pages/ErrorPage'
import usePost from '../../../../hooks/usePost'
import LoaderSpinnerMini from '../../../LoaderSpinnerMini/index'
import { ReactTinyLink } from 'react-tiny-link'
import PostSlider from '../../../PostSlider/index'
import './index.scss'

const PostMedium = ({ id }) => {
	const {
		status,
		post,
		areCommentsDisplayed,
		reactions,
		links,
		formattedContent,
		images,
		handleToogleComment,
		handleLike,
		handleNewComment,
		handleDeleteComment,
		handleNewPostReaction,
	} = usePost(id)

	return status === 200 && post ? (
		<>
			<div className='card relative'>
				{images && <PostSlider sliderData={images} />}
				<div className='col-12'>
					<div className='row mt-2'>
						<div className='col-6 px-0'>
							<p>{post?.user?.email}</p>
						</div>
						<div className='col-6 px-0 d-flex justify-content-end'>
							<p style={{ color: '#6c757d' }}>
								{post && parseDate(post.post?.created_at)}
							</p>
						</div>
					</div>
					<div className='row'>
						<p
							className='text-left'
							dangerouslySetInnerHTML={{ __html: formattedContent }}
						/>
					</div>

					{links && (
						<div className='row'>
							{links.map((link) => (
								<div className='row my-2' key={link}>
									<div className='col-12'>
										<ReactTinyLink
											cardSize='large'
											showGraphic={true}
											width={'100%'}
											url={link}
										/>
									</div>
								</div>
							))}
						</div>
					)}

					<div className='row'>
						<div className='col-6 d-flex align-items-end'>
							<div className='row'>
								{areCommentsDisplayed ? (
									<IconMinus
										onclick={handleToogleComment}
										fillColor={'#0C0B11'}
									/>
								) : (
									<IconPlus
										onclick={handleToogleComment}
										fillColor={'#0C0B11'}
									/>
								)}
								<p className='ml-2 mb-0'>
									Commentaires ({post?.comments?.length})
								</p>
							</div>
						</div>
						<div className='col-6 p-0 d-flex justify-content-end align-items-end'>
							<PostReaction
								classNames='row current-reactions-container d-flex justify-content-between align-items-center flex-wrap mr-4'
								postReactions={post?.reactions}
								reactions={reactions?.data}
								idPost={id}
								setPostReaction={(newPostreaction) =>
									handleNewPostReaction(newPostreaction)
								}
							/>
							<IconLike onclick={() => handleLike(id)} fillColor={'#FF4A4A'} />
							<p className='ml-2 mb-0'>{post?.likes?.length}</p>
						</div>
					</div>
					{areCommentsDisplayed && (
						<div className='row comments-container my-2'>
							<CommentGroup
								idPost={id}
								baseKey={'comments'}
								comments={post?.comments}
								setComments={(newComment) => handleNewComment(newComment)}
								removeComment={(deleted_comment_id) =>
									handleDeleteComment(deleted_comment_id)
								}
							/>
						</div>
					)}
				</div>
			</div>
		</>
	) : status === 'loading' ? (
		<LoaderSpinnerMini style={{ width: '2rem', height: '2rem' }} />
	) : (
		<ErrorPage status={status} style={{ height: '100%' }} />
	)
}

export default PostMedium
