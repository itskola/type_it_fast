import { createContext, useContext } from "react"

import { endpoints } from "../util/endpoints"

const TextModeContext = createContext()
const useTextModeContext = () => useContext(TextModeContext)

const ActionType = {
	Sentences: "sentences",
	Words: "words",
}
const Token = "textMode"

const TextModeAction = {
	Mode: {
		Sentences: ActionType.Sentences,
		Words: ActionType.Words,
	},

	Sentences: () => ({ type: ActionType.Sentences }),
	Words: () => ({ type: ActionType.Words }),

	Set: () => ({ type: localStorage.getItem(Token) }),
}

class TextMode {
	static state = {
		mode: "",
		endpoint: "",
	}

	static setState = (state, { type }) => {
		switch (type) {
			case ActionType.Sentences:
				localStorage.setItem(Token, type)
				return {
					...state,
					mode: localStorage.getItem(Token),
					endpoint: endpoints.Sentence,
				}
			case ActionType.Words:
				localStorage.setItem(Token, type)
				return {
					...state,
					mode: localStorage.getItem(Token),
					endpoint: endpoints.Words,
				}
			default:
				console.error(`Action "${type}" is not supported`)
		}
	}
}

// Initialize State
TextMode.state = TextMode.setState(TextMode.state, {
	type: localStorage.getItem(Token) || ActionType.Words,
})

export { TextModeContext, useTextModeContext, TextMode, TextModeAction }
