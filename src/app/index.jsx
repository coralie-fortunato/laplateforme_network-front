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

// TESTING
import Cookies from 'js-cookie'

Cookies.set(
	'jwt_token',
	'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJpZFwiOlwiNTJcIixcIjBcIjpcIjUyXCIsXCJmaXJzdG5hbWVcIjpudWxsLFwiMVwiOm51bGwsXCJsYXN0bmFtZVwiOm51bGwsXCIyXCI6bnVsbCxcImVtYWlsXCI6XCJhbnRvaW5lLmxlLWd1aWxsb3VAbGFwbGF0ZWZvcm1lLmlvXCIsXCIzXCI6XCJhbnRvaW5lLmxlLWd1aWxsb3VAbGFwbGF0ZWZvcm1lLmlvXCIsXCJiaXJ0aGRhdGVcIjpudWxsLFwiNFwiOm51bGwsXCJhdmF0YXJcIjpudWxsLFwiNVwiOm51bGwsXCJjb3ZlclwiOm51bGwsXCI2XCI6bnVsbCxcImxpbmtlZGluXCI6bnVsbCxcIjdcIjpudWxsLFwiZ2l0aHViXCI6bnVsbCxcIjhcIjpudWxsLFwid2Vic2l0ZVwiOm51bGwsXCI5XCI6bnVsbCxcImRlc2NyaXB0aW9uXCI6bnVsbCxcIjEwXCI6bnVsbCxcImlkX3Byb21vXCI6bnVsbCxcIjExXCI6bnVsbCxcImlkX3RyYWluaW5nXCI6bnVsbCxcIjEyXCI6bnVsbCxcImFkbWluXCI6XCIwXCIsXCIxM1wiOlwiMFwiLFwiY3JlYXRlZF9hdFwiOlwiMjAyMS0wMS0wNCAyMDoyOTo0OVwiLFwiMTRcIjpcIjIwMjEtMDEtMDQgMjA6Mjk6NDlcIixcInVwZGF0ZWRfYXRcIjpcIjAwMDAtMDAtMDAgMDA6MDA6MDBcIixcIjE1XCI6XCIwMDAwLTAwLTAwIDAwOjAwOjAwXCJ9IiwiaWF0IjoxNjA5NzkwMzMyfQ.x9HxxK7DJs2djFn32KOxcYJiuw53sJh5PTpI0cIe1dM'
)

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
