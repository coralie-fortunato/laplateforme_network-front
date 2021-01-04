import React, { useState } from 'react'
import github_logo from './icons/github_brand.png'
import linkedin_logo from './icons/linkedin_brand.png'
import IconWebsite from '../../../components/icons/IconWebsite/index'
import parseDate from '../../../helpers/parseDate'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { follow, unFollow } from '../../../services/Api/requests'

const PublicInformations = ({
	data: {
		id,
		firstname,
		lastname,
		birthdate,
		email,
		github,
		linkedin,
		website,
		description,
		created_at,
	},
	followers,
	follows,
	isAmmendable,
	setIsAmmendable,
	setNewFollow,
	deleteFollow,
	currentUserFollow,
}) => {
	const { user_id } = useParams()
	const current_user = useSelector((state) => state.current_user)
	const [status, setStatus] = useState('loading')

	const age =
		birthdate &&
		Math.floor(
			(Date.now() - Date.parse(birthdate)) / (1000 * 60 * 60 * 24 * 365)
		)

	const handleFollow = async () => {
		if (currentUserFollow) {
			const { status } = await unFollow(currentUserFollow.id)
			if (status === 204) {
				return deleteFollow(currentUserFollow)
			}
		} else {
			const { data, status } = await follow({
				id_followed: user_id,
			})
			if (status === 200) {
				return setNewFollow(data)
			}
		}
		setStatus(status)
	}

	const handleClick = () => {
		setIsAmmendable(!isAmmendable)
	}
	return (
		<>
			<div className='row px-3'>
				<div className='col-12 col-lg-8 d-flex flex-column justify-content-center'>
					<h1 className='my-2'>
						{firstname && `${firstname},`}
						{lastname && `${lastname},`} {birthdate && `${age} ans`}
					</h1>
					<h2>
						<small className='font-italic'>{email}</small>
					</h2>
					<h2 className='my-2'>
						{created_at &&
							`Inscrit depuis le ${parseDate(Date.parse(created_at))}`}
					</h2>
				</div>
				<div className='col-12 col-lg-4 p-4 rounded'>
					<div className='d-flex justify-content-around align-items-center my-4'>
						<h2 className='font-italic my-2 mr-4'>
							<small> {followers.length} abonnés</small>
						</h2>
						<h2 className='font-italic my-2'>
							<small>{follows.length} abonnement</small>
						</h2>
					</div>

					<div className='d-flex justify-content-around align-items-center'>
						<a href={github}>
							<img
								src={github_logo}
								className='shadow rounded-circle p-2'
								alt='profile github'
								title='Voir le compte github'
							/>
						</a>
						<a href={linkedin}>
							<img
								src={linkedin_logo}
								className='shadow rounded-circle p-2'
								alt='profile linkedin'
								title='Voir le compte linkedin'
							/>
						</a>
						<IconWebsite
							href={website}
							title='Voir le site personnel'
							classNames={['shadow', 'rounded-circle', 'p-2']}
						/>
					</div>
				</div>
			</div>
			<div className='col-12 col-lg-8 px-3'>
				{current_user.id === user_id ? (
					<button
						className={`col-lg-4 btn btn-lg btn-${
							isAmmendable ? 'warning' : 'primary'
						} my-2 ml-0`}
						onClick={handleClick}
					>
						{isAmmendable ? 'PROFIL PUBLIC' : 'EDITER'}
					</button>
				) : (
					<>
						<button className='col-lg-4 btn btn-lg btn-primary my-2'>
							CONTACTER
						</button>
						<button
							className='col-lg-4 btn btn-lg btn-warning my-2 ml-0 ml-lg-4'
							onClick={handleFollow}
						>
							{currentUserFollow ? 'NE PLUS SUIVRE' : 'SUIVRE'}
						</button>
					</>
				)}
			</div>
		</>
	)
}
export default PublicInformations
