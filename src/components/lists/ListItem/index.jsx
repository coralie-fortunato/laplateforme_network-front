import React, { useEffect, useState } from 'react'
import { ReactTinyLink } from 'react-tiny-link'
import IconDelete from '../../icons/IconDelete/index'
import LoaderSpinnerMini from '../../LoaderSpinnerMini/index'
import ErrorPage from '../../../pages/ErrorPage'
import {
	deleteComment,
	deleteExperience,
	deleteUserHobby,
	deleteUserSkill,
	deletePost,
} from '../../../services/Api/requests'

const ListItem = ({
	itemType,
	item: {
		id,
		name,
		content,
		job_name,
		company,
		city,
		country,
		start_date,
		end_date,
		created_at,
		user_skill_id,
		user_hobby_id,
	},
	isAmmendable,
}) => {
	const [status, setStatus] = useState('loading')
	const [commentLinks, setCommentLinks] = useState(null)
	const [formattedContent] = useState(
		content
			? content.replace(/(https:\/\/[a-z0-9\S]+)/g, "<a href='$1'>lien</a>")
			: null
	)

	const parseCommentLinks = (content) => {
		content && setCommentLinks(content.match(/https:\/\/[a-z0-9\S]+/g))
	}

	const handleDelete = async () => {
		let responseStatus
		if (itemType === 'skills') {
			let { status } = await deleteUserSkill(user_skill_id)
			responseStatus = status
		} else if (itemType === 'experiences-pros') {
			let { status } = await deleteExperience(id)
			responseStatus = status
		} else if (itemType === 'hobbies') {
			let { status } = await deleteUserHobby(user_hobby_id)
			responseStatus = status
		} else if (itemType === 'comments') {
			let { status } = await deleteComment(id)
			responseStatus = status
		} else if (itemType === 'posts') {
			let { status } = await deletePost(id)
			responseStatus = status
		}
		setStatus(responseStatus)
	}

	useEffect(() => {
		parseCommentLinks(content)
		setStatus(200)
	}, [])

	return status === 200 ? (
		<li className='list-item row col-12' key={id} id={id}>
			<div className='col-12 px-0 font-italic'>
				{itemType === 'skills' && (
					<span className='my-4 font-weight-bold'>
						Ajout d&apos;une nouvelle compétence, {`le ${created_at}`}:
					</span>
				)}
				{itemType === 'experiences-pros' && (
					<span className='my-4 font-weight-bold'>{`Du ${start_date} au ${end_date}`}</span>
				)}
				{itemType === 'hobbies' && (
					<span className='my-4 font-weight-bold'>
						Partage d&apos;une nouvelle passion, {`le ${created_at}`}:
					</span>
				)}
				{(itemType === 'comments' || itemType === 'posts') && (
					<span className='my-4 font-weight-bold'>
						Nouvelle publication, {`le ${created_at}`}:
					</span>
				)}
			</div>
			<div className='col-11 px-0'>
				{itemType === 'skills' && (
					<p className='badge badge-pill badge-primary p-2 my-2'>{name}</p>
				)}
				{itemType === 'experiences-pros' && (
					<p className='my-2'>
						{job_name ? (
							job_name
						) : (
							<small className='fon-italic mx-2'>
								Information non renseignée
							</small>
						)}
						-
						{company ? (
							company
						) : (
							<small className='fon-italic mx-2'>
								Information non renseignée
							</small>
						)}
						-
						{city ? (
							city
						) : (
							<small className='fon-italic mx-2'>
								Information non renseignée
							</small>
						)}
						-
						{country ? (
							country
						) : (
							<small className='fon-italic mx-2'>
								Information non renseignée
							</small>
						)}
					</p>
				)}
				{itemType === 'hobbies' && (
					<p className='badge badge-pill badge-primary p-2 my-2'>{name}</p>
				)}
				{(itemType === 'comments' || itemType === 'posts') && (
					<>
						<p>
							<div dangerouslySetInnerHTML={{ __html: formattedContent }} />
						</p>
						{commentLinks &&
							commentLinks.map((commentLink, index) => (
								<div className='row my-2' key={`commentLink-${index}`}>
									<div className='col-12'>
										<ReactTinyLink
											cardSize='small'
											showGraphic={true}
											width={'100%'}
											url={commentLink}
										/>
									</div>
								</div>
							))}
					</>
				)}
			</div>
			<div className='col-1 px-0 d-flex justify-content-center'>
				{isAmmendable && <IconDelete onClick={handleDelete} />}
			</div>
		</li>
	) : status === 'loading' ? (
		<LoaderSpinnerMini style={{ height: '100%' }} />
	) : (
		<ErrorPage status={status} style={{ height: '100%' }} />
	)
}

export default ListItem
