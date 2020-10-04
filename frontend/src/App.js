import React, { useEffect, useReducer } from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

import ProtectedRoute from "./components/ProtectedRoute"
import { AuthContext, Auth, AuthAction } from "context/auth"
import { TextModeContext, TextMode } from "context/textMode"

import AboutWebsite from "./components/AboutWebsite/AboutWebsite"
import Intro from "./components/Intro/Intro"
import Main from "./components/Main/Main"
import NotFound from "./components/NotFound/NotFound"

import { endpoints } from "util/endpoints"
import axios from "axios"

import "bootstrap/dist/css/bootstrap.min.css"
import "./components/CustomBootstrap.css"
import "./App.css"

function App() {
	const [authState, setAuthState] = useReducer(Auth.setState, Auth.state)
	const [textModeState, setTextModeState] = useReducer(TextMode.setState, TextMode.state)

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
			<TextModeContext.Provider value={{ textModeState, setTextModeState }}>
				<Router>
					<Switch>
						<ProtectedRoute exact path="/" component={Main} />
						<Route path="/join">
							{authState.isAuth ? <Redirect to="/" /> : <Intro />}
						</Route>
						<Route component={NotFound} />
					</Switch>
				</Router>
				<AboutWebsite />
			</TextModeContext.Provider>
		</AuthContext.Provider>
	)
}

export default App
