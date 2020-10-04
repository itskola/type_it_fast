import React from "react"
import { Route, Redirect } from "react-router-dom"
import { AuthAction } from "context/auth"

function ProtectedRoute({ component: Component, ...rest }) {
	return (
		<Route
			{...rest}
			render={props =>
				AuthAction.LocalAuth() ? <Component {...props} /> : <Redirect to="/join" />
			}
		/>
	)
}

export default ProtectedRoute
