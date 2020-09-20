const session = "/api/session"
const account = "/api/account"
const textMode = "/api/text-mode"

export const endpoints = {
	Login: `${session}`,
	Logout: `${session}`,

	Register: `${account}`,
	DeleteAccount: `${account}`,

	Sentence: `${textMode}/sentence`,
	Words: `${textMode}/words`,
}
