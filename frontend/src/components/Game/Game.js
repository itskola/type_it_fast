import React from "react"

import Title from "../Title/Title"
import TypeFast from "./TypeFast/TypeFast"
// import Scoreboard from "./Scoreboard"

import "./Game.css"

function Game() {
	return (
		<div id="game" className="scrollbar-hidden">
			<Title />
			<TypeFast />
			{/* <Scoreboard /> */}
		</div>
	)
}

export default Game
