import React from 'react'
import { useSelector } from 'react-redux'

const AuthRoute = ({ component: Component }) => {
	const current_user = useSelector((state) => state.current_user)
	return current_user && <Component />
}

export default AuthRoute
