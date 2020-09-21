import { createContext, useContext } from "react"

import { endpoints } from "../util/endpoints"

const TextModeContext = createContext()
const useTextModeContext = () => useContext(TextModeContext)

const ActionType = {
	Sentences: "sentences",
	Words: "words",
}
const Token = "textMode"

class TextModeAction {
	static Modes = {
		Sentences: ActionType.Sentences,
		Words: ActionType.Words,
	}

	static Sentences = () => ({ type: ActionType.Sentences })

	static Words = () => ({ type: ActionType.Words })
}

class TextMode {
	static state = {
		mode: localStorage.getItem(Token) || ActionType.Sentences,
		endpoint: endpoints.Sentence,
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

export { TextModeContext, useTextModeContext, TextMode, TextModeAction }
