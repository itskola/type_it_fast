import React from "react"

import Options from "../Options/Options"
import Game from "../Game/Game"
import Chat from "../Chat/Chat"

import "./Main.css"

function Main() {
	return (
		<div id="main-container">
			<Options />
			<Game />
			<Chat />
		</div>
	)
}

export default Main
