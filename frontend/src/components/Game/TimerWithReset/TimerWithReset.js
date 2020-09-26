import React from "react"

import Timer from "../Timer/Timer"

import "./TimerWithReset.css"

function TimerWithReset({ state, setState, onReset, onStop }) {
	const handleReset = () => {
		setState({ start: false, reset: false })
		onReset()
	}

	return (
		<div className="timer-with-reset">
			<Timer
				start={state.start}
				reset={state.reset}
				onReset={handleReset}
				onStop={onStop}
			/>

			<button
				className="strip-css-btn timer-reset"
				onClick={() => setState({ ...state, reset: true })}
			>
				<i className="fa fa-sync"></i>
			</button>
		</div>
	)
}

export default TimerWithReset
