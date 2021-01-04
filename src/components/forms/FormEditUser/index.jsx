import React from 'react'
import ImageInformations from './ImageInformations'
import PersonnalInformations from './PersonnalInformations/index'

const FormEditUser = ({ data, setUserData }) => {
	return (
		<>
			<PersonnalInformations
				data={data}
				setUserData={(newUserData) => setUserData(newUserData)}
			/>
			<ImageInformations
				data={data}
				setUserData={(newUserData) => setUserData(newUserData)}
			/>
		</>
	)
}

export default FormEditUser
