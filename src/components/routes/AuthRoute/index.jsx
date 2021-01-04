import React from 'react'
import { useSelector } from 'react-redux'
import ErrorPage from '../../../pages/ErrorPage'
import { useHistory } from 'react-router-dom'

const ButtonSignin = () => {
	const history = useHistory()
	const handleClick = () => {
		history.push('/')
	}
	return (
		<button
			className='btn btn-lg bg-primary-color text-white col-4'
			onClick={handleClick}
		>
			CONNEXION
		</button>
	)
}

const AuthRoute = ({ component: Component }) => {
	const current_user = useSelector((state) => state.current_user)
	return current_user ? (
		<Component />
	) : (
		<ErrorPage
			status={403}
			style={{ minHeight: '100vh' }}
			component={ButtonSignin}
		/>
	)
}

export default AuthRoute
