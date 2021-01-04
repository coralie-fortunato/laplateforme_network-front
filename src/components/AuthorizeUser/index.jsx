import { useEffect } from 'react'
import { authorize, getCurrentUser } from '../../services/Api/requests'
import Cookies from 'js-cookie'
import { parse } from 'query-string'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../../store/actions'

const AuthorizeUser = () => {
	const dispatch = useDispatch()
	const history = useHistory()
	const { code } = parse(window.location.search)

	useEffect(() => {
		const handleAuthorization = async (code) => {
			const { data, status } = await authorize({ code })
			if (status === 200) {
				Cookies.set('jwt_token', data.jwt_token)
			}

			const { data: current_user } = await getCurrentUser()
			dispatch(setCurrentUser(current_user))

			history.push('/feed')
		}

		handleAuthorization(code)
	}, [code, history])

	return ''
}

export default AuthorizeUser
