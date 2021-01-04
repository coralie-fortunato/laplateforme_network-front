import React, { useRef, useState, useEffect } from 'react'
import { userUpdate } from '../../../../services/Api/requests'
import { useSelector } from 'react-redux'
import LoaderSpinner from '../../../LoaderSpinner/index'
import ErrorPage from '../../../../pages/ErrorPage'

const PersonnalInformations = ({
	data: {
		id,
		firstname,
		lastname,
		birthdate,
		linkedin,
		github,
		website,
		description,
	},
	setUserData,
}) => {
	const [status, setStatus] = useState('loading')
	const current_user = useSelector((state) => state.current_user)
	const personnalInfosRef = useRef(null)
	const handleSubmit = async (event) => {
		setStatus('loading')
		if (current_user) {
			event.preventDefault()
			const formData = new FormData(personnalInfosRef.current)
			let data = {
				cover: current_user.cover,
				avatar: current_user.avatar,
				id_promo: current_user.id_promo,
				email: current_user.email,
			}
			for (const pair of formData.entries()) {
				if (data[pair[0]] !== '') {
					data[pair[0]] = pair[1]
				} else {
					data[pair[0]] = current_user[pair[0]]
				}
			}
			const { data: userData, status } = await userUpdate(data, current_user.id)
			if (status === 200) {
				setUserData(userData)
				setStatus(status)
			} else {
				setStatus(status)
			}
		} else {
			setStatus(403)
		}
	}
	useEffect(() => {
		setStatus(200)
	}, [])
	return status === 200 && current_user ? (
		<form
			action=''
			className='col-12 flex py-4 my-4'
			id={`form-user-profile-${id}`}
			ref={personnalInfosRef}
			onSubmit={handleSubmit}
		>
			<h2>Informations personnelles</h2>
			<div className='form-group'>
				<label htmlFor='firstname'>Prénom :</label>
				<input
					id='firstname'
					name='firstname'
					type='text'
					className='form-control'
					defaultValue={firstname}
				/>
			</div>
			<div className='form-group'>
				<label htmlFor='lastname'>Nom :</label>
				<input
					id='lastname'
					name='lastname'
					type='text'
					className='form-control'
					defaultValue={lastname}
				/>
			</div>
			<div className='form-group'>
				<label htmlFor='birthdate'>Date de naissance :</label>
				<input
					id='birthdate'
					name='birthdate'
					type='date'
					className='form-control'
					defaultValue={birthdate}
				/>
			</div>
			<div className='form-group'>
				<label htmlFor='linkedin'>Lien profil linkedin</label>
				<input
					id='linkedin'
					name='linkedin'
					type='text'
					className='form-control'
					defaultValue={linkedin}
				/>
			</div>
			<div className='form-group'>
				<label htmlFor='github'>Lien profil Github</label>
				<input
					id='github'
					name='github'
					type='text'
					className='form-control'
					defaultValue={github}
				/>
			</div>
			<div className='form-group'>
				<label htmlFor='website'>Site personnel</label>
				<input
					id='website'
					name='website'
					type='text'
					className='form-control'
					defaultValue={website}
				/>
			</div>
			<div className='form-group'>
				<label htmlFor='description'>Description</label>
				<textarea
					id='description'
					name='description'
					className='form-control'
					defaultValue={description}
				></textarea>
			</div>
			<button className='btn btn-md col-12 col-lg-3 btn-success' type='submit'>
				valider
			</button>
		</form>
	) : status === 'loading' ? (
		<LoaderSpinner style={{ height: '100%' }} />
	) : (
		<ErrorPage status={status} style={{ height: '100vh' }} />
	)
}

export default PersonnalInformations
