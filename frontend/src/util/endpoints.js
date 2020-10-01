const session = "/api/session"
const account = "/api/account"
const textMode = "/api/text-mode"
const progress = "/api/results"

export const endpoints = {
	Login: `${session}`,
	Logout: `${session}`,
	// ChangePassword: `${session}`,

	Register: `${account}`,
	DeleteAccount: `${account}`,

	Words: `${textMode}/words`,
	Sentence: `${textMode}/sentences`,
	Results: `${progress}`,

	ProjectSource: "https://github.com/itskola/type_it_fast",
}
