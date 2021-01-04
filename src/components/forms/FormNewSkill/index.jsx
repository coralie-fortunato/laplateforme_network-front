import React, { useState, useEffect, useRef } from 'react'
import ErrorPage from '../../../pages/ErrorPage'
import { addUserSkill, getSkills } from '../../../services/Api/requests'
import LoaderSpinner from '../../LoaderSpinner'

const FormNewSkill = ({ setNewSkill }) => {
	const [status, setStatus] = useState('loading')
	const [skills, setSkills] = useState([])
	const newUserSkillFormRef = useRef(null)
	const handleSubmit = async (event) => {
		setStatus('loading')
		event.preventDefault()
		const formData = new FormData(newUserSkillFormRef.current)
		const { data, status } = await addUserSkill({
			id_skill: formData.get('id_skill'),
		})
		if (status === 200) {
			setNewSkill(data)
		}
		setStatus(status)
	}
	useEffect(() => {
		const fetchSkills = async () => {
			const { data, status } = await getSkills()
			if (status === 200) {
				setSkills(data)
			}
			setStatus(status)
		}
		fetchSkills()
	}, [])
	return status === 200 && skills ? (
		<form
			action=''
			className='col-12 my-4'
			ref={newUserSkillFormRef}
			onSubmit={handleSubmit}
		>
			<h5>Que savez vous faire ?</h5>
			<div className='form-group'>
				<label htmlFor='id_hobby'>Partager mes compétences</label>
				<select name='id_skill' id='id_skill' className='form-control'>
					{skills.data.map((skill) => (
						<option key={`skill-${skill.id}`} value={skill.id}>
							{skill.name}
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

export default FormNewSkill
