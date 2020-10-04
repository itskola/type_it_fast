import { SentencesContainer, WordsContainer } from "util/wordsContainer"
import { TextModeAction } from "context/textMode"

let container = null
let WordsToShow = 30

const ActionType = {
	Init: "init",
	Correct: "correct",
	Incorrect: "incorrect",
	Next: "next",
	Reset: "reset",
}

const WordsInfoAction = {
	Init: (text, mode) => ({
		type: ActionType.Init,
		payload: { data: text, mode },
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
	Reset: mode => ({
		type: ActionType.Reset,
		payload: mode,
	}),
}

class WordsInfo {
	static state = {
		shown: [],
		status: [],
	}

	static setState = (state, { type, payload }) => {
		switch (type) {
			case ActionType.Init:
				WordsToShow = 30

				if (payload.mode === TextModeAction.Mode.Sentences)
					container = new SentencesContainer(payload.data)
				else
					container = new WordsContainer(payload.data)

				if (WordsToShow > container.length)
					WordsToShow = container.length

				return {
					shown: container.init(WordsToShow),
					status: [],
				}
			case ActionType.Correct:
				return {
					...state,
					status: [...state.status, true],
				}
			case ActionType.Incorrect:
				return {
					...state,
					status: [...state.status, false],
				}
			case ActionType.Next:
				return {
					shown: container.next(payload, state.shown),
					status: [],
				}
			case ActionType.Reset:
				container.reset()

				return {
					shown: container.init(WordsToShow),
					status: [],
				}
			default:
				console.error(`Action "${type}" is not supported`)
				return state
		}
	}
}

export { WordsInfo, WordsInfoAction }
