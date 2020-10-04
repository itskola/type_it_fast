const Token = "duration"

const defaultDuration = 60

export const Duration = {
	Set: seconds => {
		localStorage.setItem(Token, seconds)
	},

	Get: () => +localStorage.getItem(Token) || defaultDuration,
}
