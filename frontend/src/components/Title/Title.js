import React from "react"

import "./Title.css"

function Title({ className="" }) {
	return (
		<div id="title">
			<h1 className={className}>
				Type it Fast{/* <span>.io</span> */}
			</h1>
		</div>
	)
}

export default Title
