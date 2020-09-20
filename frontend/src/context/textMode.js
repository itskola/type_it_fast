import { createContext, useContext } from "react"

import { endpoints } from "../util/endpoints"

const TextModeContext = createContext()
const useTextModeContext = () => useContext(TextModeContext)

const ActionType = {
	Words: "words",
	Sentences: "sentences",
}
const Token = "textMode"

class TextModeAction {
	static Modes = {
		Words: ActionType.Words,
		Sentences: ActionType.Sentences,
	}

	static Words = () => ({ type: ActionType.Words })

	static Sentences = () => ({ type: ActionType.Sentences })
}

class TextMode {
	static state = {
		mode: localStorage.getItem(Token) || ActionType.Senteces,
		endpoint: endpoints.Sentence,
	}

	static setState = (state, { type }) => {
		switch (type) {
			case ActionType.Words:
				localStorage.setItem(Token, type)
				return {
					...state,
					mode: localStorage.getItem(Token),
					endpoint: endpoints.Words,
				}
			case ActionType.Sentences:
				localStorage.setItem(Token, type)
				return {
					...state,
					mode: localStorage.getItem(Token),
					endpoint: endpoints.Sentence,
				}
			default:
				console.error(`Action "${type}" is not supported`)
		}
	}
}

export { TextModeContext, useTextModeContext, TextMode, TextModeAction }
