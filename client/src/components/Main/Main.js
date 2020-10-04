import React from "react"

import TypeFast from "../TypeFast/TypeFast"
import Options from "../Options/Options"
import Title from "../Title/Title"
import Chat from "../Chat/Chat"

import "./Main.css"

function Main() {
	return (
		<div id="main-container">
			<Options />
			<div className="group-col">
				<Title />
				<TypeFast />
			</div>
			<Chat />
		</div>
	)
}

export default Main
