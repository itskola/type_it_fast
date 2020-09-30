import React, { useReducer } from "react"

import { TextModeContext, TextMode } from "context/textMode"

import ProjectSource from "../ProjectSource/ProjectSource"
import TypeFast from "../TypeFast/TypeFast"
import Options from "../Options/Options"
import Title from "../Title/Title"
import Chat from "../Chat/Chat"

import "./Main.css"

function Main() {
	const [textModeState, setTextModeState] = useReducer(
		TextMode.setState,
		TextMode.state
	)

	return (
		<TextModeContext.Provider value={{ textModeState, setTextModeState }}>
			<div id="main-container">
				<Options />
				<div className="group-col">
					<Title />
					<TypeFast />
				</div>
				<Chat />
				<ProjectSource />
			</div>
		</TextModeContext.Provider>
	)
}

export default Main
