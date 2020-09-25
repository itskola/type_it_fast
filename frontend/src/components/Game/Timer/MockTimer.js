import React from "react"

function MockTimer({ seconds, onDecrease, onIncrease, formatSeconds }) {
	return (
		<>
			<button className="strip-css-btn" onClick={onDecrease}>
				-
			</button>
			<span className="time">{formatSeconds(seconds)}</span>
			<button className="strip-css-btn" onClick={onIncrease}>
				+
			</button>
		</>
	)
}

export default MockTimer
