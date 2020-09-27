const session = "/api/session"
const account = "/api/account"
const textMode = "/api/text-mode"

export const endpoints = {
	Login: `${session}`,
	Logout: `${session}`,

	Register: `${account}`,
	DeleteAccount: `${account}`,

	Words: `${textMode}/words`,
	Sentence: `${textMode}/sentence`,

	ProjectSource: "https://github.com/itskola/type_it_fast",
}
