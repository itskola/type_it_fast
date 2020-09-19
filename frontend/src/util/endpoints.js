const session = "/api/session"
const account = "/api/account"

export const endpoints = {
	Login: `${session}`,
	Logout: `${session}`,

	Register: `${account}`,
	DeleteAccount: `${account}`
}