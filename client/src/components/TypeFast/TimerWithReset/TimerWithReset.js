import React from "react"

import Timer from "../Timer/Timer"

import "./TimerWithReset.css"

function TimerWithReset({ state, setState, onTick, onReset, onStop }) {
	return (
		<div className="group-row timer-with-reset">
			<Timer
				start={state.start}
				reset={state.reset}
				onTick={onTick}
				onReset={onReset}
				onStop={onStop}
			/>

			<div className="timer-reset-separator">
				<button
					className="strip-css-btn timer-reset"
					title="Reset"
					onClick={() => setState({ ...state, reset: true })}
				>
					<i className="fa fa-sync"></i>
				</button>
			</div>
		</div>
	)
}

export default TimerWithReset
