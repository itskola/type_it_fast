import React from "react"

import Spinner from "react-bootstrap/Spinner"

import "./SaveResult.css"

function SaveResult({ onClick, waitingResponse }) {
	return (
		<div id="save-result">
			{waitingResponse ? (
				<div>
					<Spinner animation="border"></Spinner>
				</div>
			) : (
				<button
					className="strip-css-btn"
					title="Save result"
					onClick={onClick}
				>
					<i className="fas fa-save"></i>
				</button>
			)}
		</div>
	)
}

export default SaveResult
