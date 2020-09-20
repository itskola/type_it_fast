import React, { useReducer } from "react"

import { TextModeContext, TextMode } from "../../context/textMode"

import Options from "../Options/Options"
import Game from "../Game/Game"
import Chat from "../Chat/Chat"

import "./Main.css"

function Main() {
	const [textModeState, setTextModeState] = useReducer(
		TextMode.setState,
		TextMode.state
	)

	return (
		<TextModeContext.Provider value={{textModeState, setTextModeState}}>
			<div id="main-container">
				<Options />
				<Game />
				<Chat />
			</div>
		</TextModeContext.Provider>
	)
}

export default Main
