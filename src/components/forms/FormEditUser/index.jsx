import React from 'react'
import ImageInformations from './ImageInformations'
import PersonnalInformations from './PersonnalInformations/index'
import SignInformations from './SignInformations'

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
			<SignInformations data={data} />
		</>
	)
}

export default FormEditUser
