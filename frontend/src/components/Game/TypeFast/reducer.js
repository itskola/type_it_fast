const ActionType = {
	Init: "init",
	Error: "error",
	Correct: "correct",
	Incorrect: "incorrect",
	Next: "next",
	Reset: "reset",
}

const WordsInfoAction = {
	Init: text => ({
		type: ActionType.Init,
		payload: text,
	}),
	Error: () => ({
		type: ActionType.Error,
	}),
	Correct: () => ({
		type: ActionType.Correct,
	}),
	Incorrect: () => ({
		type: ActionType.Incorrect,
	}),
	Next: count => ({
		type: ActionType.Next,
		payload: count,
	}),
	Reset: () => ({
		type: ActionType.Reset,
	}),
}

let AllWords = []
let NumberOfShownWords = 30
const ErrorWord = "---"

class WordsInfo {
	static state = {
		shown: [],
		status: [],
	}

	static setState = (state, { type, payload }) => {
		switch (type) {
			case ActionType.Init:
				AllWords = payload.split(" ")
				return {
					shown: AllWords.slice(0, NumberOfShownWords),
					status: [],
				}
			case ActionType.Error:
				AllWords = [ErrorWord]
				return {
					shown: [ErrorWord],
					status: [],
				}
			case ActionType.Correct:
				return {
					shown: state.shown,
					status: [...state.status, true],
				}
			case ActionType.Incorrect:
				return {
					shown: state.shown,
					status: [...state.status, false],
				}
			case ActionType.Next:
				return {
					shown: AllWords.slice(10, NumberOfShownWords),
					status: [],
				}
			case ActionType.Reset:
				return {
					shown: AllWords.slice(0, NumberOfShownWords),
					status: [],
				}
			default:
				console.error(`Action "${type}" is not supported`)
				return state
		}
	}
}

export { WordsInfo, WordsInfoAction }
