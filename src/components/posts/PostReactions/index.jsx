import React, { useState, useEffect } from 'react'
import ErrorPage from '../../../pages/ErrorPage'
import { reactToPost } from '../../../services/Api/requests'
import LoaderSpinnerMini from '../../LoaderSpinnerMini/index'

const PostReaction = ({
	reactions,
	postReactions,
	style,
	classNames,
	idPost: id_post,
	setPostReaction,
}) => {
	const [status, setStatus] = useState('loading')
	const handleClick = async (id_reaction) => {
		setStatus('loading')
		const { data, status } = await reactToPost({
			id_post,
			id_reaction,
		})
		if (status === 200) {
			setPostReaction(data)
			setStatus(200)
		} else {
			setStatus(status)
		}
	}

	useEffect(() => {
		setStatus(200)
	}, [])

	return status === 200 ? (
		<div className={classNames ? classNames : ''} style={style ? style : {}}>
			{reactions?.map((reaction) => {
				return (
					<div key={reaction.id} className='mx-2' style={{ cursor: 'pointer' }}>
						<span onClick={() => handleClick(reaction.id)}>
							{reaction.type}
						</span>
						<sub>
							{
								postReactions?.filter((e) => e.id_reaction === reaction.id)
									.length
							}
						</sub>
					</div>
				)
			})}
		</div>
	) : status === 'loading' ? (
		<LoaderSpinnerMini style={{ width: '1rem', height: '1rem' }} />
	) : (
		<ErrorPage status={status} />
	)
}

export default PostReaction
