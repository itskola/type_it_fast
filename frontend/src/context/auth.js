import { createContext, useContext } from "react"

const AuthContext = createContext()
const useAuthContext = () => useContext(AuthContext)

const ActionType = {
	Login: "login",
	Logout: "logout",
}
const Token = "auth"

const AuthAction = {
	LocalAuth: () => localStorage.getItem(Token),
	
	Login: payload => ({
		type: ActionType.Login,
		payload,
	}),
	Logout: () => ({
		type: ActionType.Logout,
		payload: {},
	}),
	DeleteAccount: () => {
		return AuthAction.Logout()
	},
}

class Auth {
	static state = {
		id: null,
		username: null,
		isAuth: false,
	}

	static setState = (state, { type, payload }) => {
		switch (type) {
			case ActionType.Login:
				let isAuth = false
				if (payload.id && payload.username) isAuth = true

				localStorage.setItem(Token, isAuth)
				return {
					...state,
					id: payload.id,
					username: payload.username,
					isAuth,
				}
			case ActionType.Logout:
				localStorage.removeItem(Token)
				return {
					id: null,
					username: null,
					isAuth: false,
				}
			default:
				console.error(`Action "${type}" is not supported`)
		}
	}
}

export { AuthContext, useAuthContext, Auth, AuthAction }
