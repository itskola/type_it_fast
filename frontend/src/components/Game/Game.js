import React from "react"

import Title from "../Title/Title"
import TypeFast from "./TypeFast/TypeFast"
// import Scoreboard from "./Scoreboard/Scoreboard"

import "./Game.css"

function Game() {
	return (
		<div id="game">
			<Title />
			<TypeFast />
			{/* <Scoreboard /> */}
		</div>
	)
}

export default Game
