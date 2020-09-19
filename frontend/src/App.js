import React, { useReducer } from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

import ProtectedRoute from "./components/ProtectedRoute"
import { AuthContext, Auth } from "./context/auth"

import Intro from "./components/Intro/Intro"
import Main from "./components/Main/Main"
import NotFound from "./components/NotFound/NotFound"

import "bootstrap/dist/css/bootstrap.min.css"
import "./util/custom-bootstrap.css"
import "./App.css"

function App() {
	const [authState, setAuthState] = useReducer(Auth.setState, Auth.state)

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
