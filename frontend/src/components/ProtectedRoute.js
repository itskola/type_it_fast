import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuthContext } from "../context/auth"

function ProtectedRoute({ component: Component, ...rest }) {
    const isAuth = useAuthContext().authState.isAuth

	return (
		<Route
			{...rest}
			render={props =>
				isAuth ? <Component {...props} /> : <Redirect to="/" />
			}
		/>
	)
}

export default ProtectedRoute
