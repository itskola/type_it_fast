import React, { useEffect, useReducer } from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

import ProtectedRoute from "./components/ProtectedRoute"
import { AuthContext, Auth, AuthAction } from "context/auth"
import { endpoints } from "util/endpoints"

import Intro from "./components/Intro/Intro"
import Main from "./components/Main/Main"
import NotFound from "./components/NotFound/NotFound"

import axios from "axios"

import "bootstrap/dist/css/bootstrap.min.css"
import "./components/CustomBootstrap.css"
import "./App.css"

function App() {
	const [authState, setAuthState] = useReducer(Auth.setState, Auth.state)

	useEffect(() => {
		// check if user is already logged in
		if (AuthAction.LocalAuth()) {
			axios.get(endpoints.Login)
				.then(({ data }) => {
					setAuthState(AuthAction.Login(data))
				})
				.catch(() => {
					// logout out user locally if cookie was destroyed 
					setAuthState(AuthAction.Logout())
				})
		}
	}, [setAuthState])

	return (
		<AuthContext.Provider value={{ authState, setAuthState }}>
			<Router>
				<Switch>
					<Route exact path="/">
						{authState.isAuth ? <Redirect to="/main" /> : <Intro />}
					</Route>
					<ProtectedRoute path="/main" component={Main} />
					<Route component={NotFound} />
				</Switch>
			</Router>
		</AuthContext.Provider>
	)
}

export default App
