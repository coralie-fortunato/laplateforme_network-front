import React, { useRef, useState, useEffect } from 'react'
import { addExperience } from '../../../services/Api/requests'
import countries from './countries.json'
import LoaderSpinnerMini from '../../LoaderSpinnerMini/index'
import ErrorPage from '../../../pages/ErrorPage'

const FormNewExperience = ({ setNewExperience }) => {
	const [status, setStatus] = useState('loading')
	const newExperienceFormRef = useRef(null)
	const handleSubmit = async (event) => {
		setStatus('loading')
		event.preventDefault()
		const formData = new FormData(newExperienceFormRef.current)
		let newExperience = {}
		for (const pair of formData.entries()) {
			newExperience[pair[0]] = pair[1]
		}
		const { data, status } = await addExperience(newExperience)
		if (status === 200) {
			setNewExperience(data)
		}
		setStatus(status)
	}
	useEffect(() => {
		setStatus(200)
	}, [])
	return status === 200 ? (
		<form
			action=''
			className='col-12 my-4'
			onSubmit={handleSubmit}
			ref={newExperienceFormRef}
		>
			<h5> Ajouter une experience professionnelle</h5>

			<div className='row'>
				<div className='form-group col-12 col-md-6'>
					<label htmlFor='job_name'>Intitulé du poste</label>
					<input
						id='job_name'
						name='job_name'
						type='text'
						className='form-control'
					/>
				</div>
				<div className='form-group col-12 col-md-6'>
					<label htmlFor='company'>Société</label>
					<input
						id='company'
						name='company'
						type='text'
						className='form-control'
					/>
				</div>
			</div>

			<div className='row'>
				<div className='form-group col-12 col-md-6'>
					<label htmlFor='start_date'>Date de debut</label>
					<input
						id='start_date'
						name='start_date'
						type='date'
						className='form-control'
					/>
				</div>

				<div className='form-group col-12 col-md-6'>
					<label htmlFor='end_date'>Date de fin</label>
					<input
						id='end_date'
						name='end_date'
						type='date'
						className='form-control'
					/>
				</div>
			</div>

			<div className='row'>
				<div className='form-group col-12 col-md-6'>
					<label htmlFor='city'>Ville</label>
					<input id='city' name='city' type='text' className='form-control' />
				</div>

				<div className='form-group col-12 col-md-6'>
					<label htmlFor='country'>Pays</label>
					<select
						id='country'
						name='country'
						type='text'
						className='form-control'
					>
						{countries.map((country) => (
							<option key={country.code} value={country.name}>
								{country.name}
							</option>
						))}
					</select>
				</div>
			</div>

			<button className='btn btn-md btn-primary col-4' type='submit'>
				ajouter
			</button>
		</form>
	) : status === 'loading' ? (
		<LoaderSpinnerMini style={{ height: '100%' }} />
	) : (
		<ErrorPage status={status} style={{ height: '100%' }} />
	)
}

export default FormNewExperience
