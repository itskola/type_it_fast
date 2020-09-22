import React, { useState, useRef } from "react"

import "./Timer.css"

function Timer() {
	const [time, setTime] = useState({
		seconds: 60,
		formatted: formatSeconds(60)
	})
	const changeTimeBy = useRef(30)

	const increaseTimer = () => {
		setTime(prev => ({
			seconds: prev.seconds + changeTimeBy.current,
			formatted: formatSeconds(prev.seconds + changeTimeBy.current)
		}))
	}
	
	const decreaseTimer = () => {
		if (time.seconds <= 0) return

		setTime(prev => ({
			seconds: prev.seconds - changeTimeBy.current,
			formatted: formatSeconds(prev.seconds - changeTimeBy.current)
		}))
	}

	function formatSeconds(seconds) {
		const partsOfTime = []

		partsOfTime.push(Math.floor(seconds / (60 * 60))) // hours

		const remainingMinutes = seconds % (60 * 60)
		partsOfTime.push(Math.floor(remainingMinutes / 60)) // minutes

		const remainingSeconds = remainingMinutes % 60
		partsOfTime.push(Math.ceil(remainingSeconds)) // seconds

		let startFrom = partsOfTime.findIndex(part => part !== 0)
		if (startFrom === -1) return "00"

		let formatted = partsOfTime[startFrom] + ""
		for (let i = startFrom + 1; i < partsOfTime.length; ++i) {
			if (partsOfTime[i] < 10) formatted += `:0${partsOfTime[i]}`
			else formatted += `:${partsOfTime[i]}`
		}
		return formatted
	}

	return (
		<div className="timer">
			<button className="strip-css-btn" onClick={decreaseTimer}>
				-
			</button>
			<span className="time">{time.formatted}</span>
			<button className="strip-css-btn" onClick={increaseTimer}>
				+
			</button>
		</div>
	)
}

export default Timer
