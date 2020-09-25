import React, { useEffect, useState } from "react"

import RealTimer from "./RealTimer"
import MockTimer from "./MockTimer"

import "./Timer.css"

const changeSeconds = (seconds, op) => {
	let change = 0
	switch (op) {
		case "+":
			change = 30
			if (seconds < 5) change = 1
			else if (seconds < 15) change = 5
			else if (seconds < 60) change = 15
			else if (seconds >= 600) change = 60
			break
		case "-":
			change = -30
			if (seconds <= 5) change = -1
			else if (seconds <= 15) change = -5
			else if (seconds <= 60) change = -15
			else if (seconds > 600) change = -60
			break
		default:
			break
	}
	return seconds + change
}

function formatSeconds(seconds) {
	const partsOfTime = []

	partsOfTime.push(Math.floor(seconds / (60 * 60))) // hours

	const remainingMinutes = seconds % (60 * 60)
	partsOfTime.push(Math.floor(remainingMinutes / 60)) // minutes

	const remainingSeconds = remainingMinutes % 60
	partsOfTime.push(Math.ceil(remainingSeconds)) // seconds

	let startFrom = partsOfTime.findIndex(part => part !== 0)
	if (startFrom === -1) return "0"

	let formatted = partsOfTime[startFrom] + ""
	for (let i = startFrom + 1; i < partsOfTime.length; ++i) {
		if (partsOfTime[i] < 10) formatted += `:0${partsOfTime[i]}`
		else formatted += `:${partsOfTime[i]}`
	}
	return formatted
}

function Timer({ start, reset, onReset, onStop }) {
	const defaultSeconds = 60
	const [seconds, setSeconds] = useState(defaultSeconds)

	const decreaseTime = () => {
		if (seconds <= 1) return
		setSeconds(prev => changeSeconds(prev, "-"))
	}

	const increaseTime = () => {
		setSeconds(prev => changeSeconds(prev, "+"))
	}

	useEffect(() => {
		if (reset)
			if(onReset) onReset()
	})

	return (
		<div className="timer">
			{start && !reset ? (
				<RealTimer
					seconds={seconds}
					formatSeconds={formatSeconds}
					onStop={onStop}
				/>
			) : (
				<MockTimer
					seconds={seconds}
					onDecrease={decreaseTime}
					onIncrease={increaseTime}
					formatSeconds={formatSeconds}
				/>
			)}
		</div>
	)
}

export default Timer
