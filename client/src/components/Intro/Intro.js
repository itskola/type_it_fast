import React from "react"

import TypeFast from "../TypeFast/TypeFast"
import Join from "../Join/Join"

import "./Intro.css"

function Intro() {
	return (
		<div id="intro" className="group-row">
			<div className="typefast-wrapper">
				<TypeFast />
			</div>
			<Join />
		</div>
	)
}

export default Intro
