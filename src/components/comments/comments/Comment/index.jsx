import React, { useState, useEffect } from 'react'
import parseDate from '../../../../helpers/parseDate'
import { useSelector } from 'react-redux'
import IconDelete from '../../../icons/IconDelete/index'
import LoaderSpinnerMini from '../../../LoaderSpinnerMini/index'
import ErrorPage from '../../../../pages/ErrorPage'
import { deleteComment } from '../../../../services/Api/requests'
import { ReactTinyLink } from 'react-tiny-link'
import useParseLinks from '../../../../hooks/useParsedLinks'

const Comment = ({ id, content, created_at, id_user, removeComment }) => {
	const [status, setStatus] = useState('loading')
	const [isCurrentUserAUthor, setIsCUrrentUserAuthor] = useState(false)
	const current_user = useSelector((state) => state.current_user)
	const [links, formattedContent] = useParseLinks(content, current_user)

	const handleDelete = async (id_comment) => {
		const { status } = await deleteComment(id_comment)
		if (status === 204) {
			removeComment(id_comment)
		} else {
			setStatus(status)
		}
	}

	useEffect(() => {
		id_user === current_user.id && setIsCUrrentUserAuthor(true)
		setStatus(200)
	}, [current_user])

	return status === 200 ? (
		<div className='col-12 p-0 comment'>
			<div className='row mt-2'>
				<div className={`${isCurrentUserAUthor ? 'col-8' : 'col-12'}`}>
					<p>
						Par John Doe le
						<span className='font-italic'> {parseDate(created_at)}</span>
					</p>
				</div>
				<div
					className={`${
						isCurrentUserAUthor
							? 'col-4 d-flex align-items-center justify-content-end'
							: 'd-none'
					}`}
				>
					<IconDelete onClick={() => handleDelete(id)} />
				</div>
			</div>

			<div className='row mt-2'>
				<div className='col-12'>
					<p className='text-left'>
						<div dangerouslySetInnerHTML={{ __html: formattedContent }} />
					</p>
				</div>
			</div>

			{links &&
				links.map((link, index) => (
					<div className='row my-2' key={`links-${index}`}>
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
	) : status === 'loading' ? (
		<LoaderSpinnerMini style={{ width: '1rem', height: '1rem' }} />
	) : (
		<ErrorPage status={status} />
	)
}

export default Comment
