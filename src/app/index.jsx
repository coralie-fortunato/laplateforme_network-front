import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Registration from '../pages/Registration'
import Profile from '../pages/Profile'
import Feed from '../pages/Feed/index'
import Chat from '../pages/Chat'
import AuthRoute from '../components/routes/AuthRoute/index'
import { getCurrentUser } from '../services/Api/requests'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../store/actions'
import ErrorPage from '../pages/ErrorPage'
import Timer from '../components/Timer/index'
import AuthorizeUser from '../components/AuthorizeUser/index'

const App = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		const fetchCurrentUser = async () => {
			const { data } = await getCurrentUser()
			dispatch(setCurrentUser(data))
		}
		fetchCurrentUser()
	}, [])

	return (
		<Router>
			<Switch>
				<Route exact path='/'>
					<Registration />
				</Route>

				<Route exact path='/users/:user_id'>
					<AuthRoute component={Profile} />
				</Route>

				<Route exact path='/feed'>
					<AuthRoute component={Feed} />
				</Route>

				<Route exact path='/chat'>
					<AuthRoute component={Chat} />
				</Route>

				<Route exact path='/authorize'>
					<AuthorizeUser />
				</Route>

				<ErrorPage status={404} style={{ minHeight: '100vh' }} />
			</Switch>
			<Timer />
		</Router>
	)
}

export default App
