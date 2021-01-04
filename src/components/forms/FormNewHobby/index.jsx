import React, { useState, useEffect, useRef } from 'react'
import ErrorPage from '../../../pages/ErrorPage'
import { addUserHobby, getHobbies } from '../../../services/Api/requests'
import LoaderSpinner from '../../LoaderSpinner'

const FormNewHobby = ({ setNewHobby }) => {
	const [status, setStatus] = useState('loading')
	const [hobbies, setHobbies] = useState([])
	const newUserHobbyFormRef = useRef(null)
	const handleSubmit = async (event) => {
		setStatus('loading')
		event.preventDefault()
		const formData = new FormData(newUserHobbyFormRef.current)
		const { data, status } = await addUserHobby({
			id_hobby: formData.get('id_hobby'),
		})
		if (status === 200) {
			setNewHobby(data)
		}
		setStatus(status)
	}
	useEffect(() => {
		const fetchHobbies = async () => {
			const { data, status } = await getHobbies()
			if (status === 200) {
				setHobbies(data)
			}
			setStatus(status)
		}
		fetchHobbies()
	}, [])
	return status === 200 && hobbies ? (
		<form
			action=''
			className='col-12 my-4'
			onSubmit={handleSubmit}
			ref={newUserHobbyFormRef}
		>
			<h5>Qu&apos;aimez vous faire dans la vie ?</h5>

			<div className='form-group'>
				<label htmlFor='id_hobby'>Partager mes passions</label>
				<select name='id_hobby' id='id_hobby' className='form-control'>
					{hobbies.data.map((hobby) => (
						<option key={`hobby-${hobby.id}`} value={hobby.id}>
							{hobby.name}
						</option>
					))}
				</select>
			</div>
			<button className='btn btn-md btn-primary col-4' type='submit'>
				ajouter
			</button>
		</form>
	) : status === 'loading' ? (
		<LoaderSpinner style={{ height: '100%' }} />
	) : (
		<ErrorPage status={status} style={{ height: '100%' }} />
	)
}

export default FormNewHobby
