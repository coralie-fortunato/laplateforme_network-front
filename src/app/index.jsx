import React, { useState, useEffect } from 'react'
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
import LoaderSpinner from '../components/LoaderSpinner'
import Timer from '../components/Timer/index'

const App = () => {
	const dispatch = useDispatch()
	const [status, setStatus] = useState('loading')
	useEffect(() => {
		const fetchCurrentUser = async () => {
			const { data, status } = await getCurrentUser()
			dispatch(setCurrentUser(data))
			setStatus(status)
		}
		fetchCurrentUser()
	}, [])

	return status === 200 ? (
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
					<Chat />
				</Route>

				<ErrorPage status={404} style={{ minHeight: '100vh' }} />
			</Switch>
			<Timer />
		</Router>
	) : status === 'loading' ? (
		<LoaderSpinner
			style={{
				height: '100vh',
				overflow: 'hidden',
			}}
		/>
	) : (
		<ErrorPage status={status} style={{ minHeight: '100vh' }} />
	)
}

export default App
