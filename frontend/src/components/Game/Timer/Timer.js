import React, { useState, useEffect, useRef } from "react"

import "./Timer.css"

const changeSeconds = (seconds, op) => {
	// (seconds == 600) ==> 10 minutes

	let change = 0
	switch (op) {
		case "+":
			change = 30
			if (seconds < 60) change = 15
			else if (seconds >= 600) change = 60
			break
		case "-":
			change = -30
			if (seconds > 600) change = -60
			else if (seconds <= 60) change = -15
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
	if (startFrom === -1) return "00"

	let formatted = partsOfTime[startFrom] + ""
	for (let i = startFrom + 1; i < partsOfTime.length; ++i) {
		if (partsOfTime[i] < 10) formatted += `:0${partsOfTime[i]}`
		else formatted += `:${partsOfTime[i]}`
	}
	return formatted
}

function Timer({ start, startCallback, reset, resetCallback }) {
	const defaultSeconds = 60
	const [time, setTime] = useState({
		seconds: defaultSeconds,
		formatted: formatSeconds(defaultSeconds),
	})

	const timerRef = useRef(null)

	const startTimer = () => {
		timerRef.current = setInterval(countdown, 1000)
	}

	const stopTimer = () => {
		clearInterval(timerRef.current)
		timerRef.current = null
	}

	const resetTimer = () => {
		stopTimer()
		setTime({
			seconds: defaultSeconds,
			formatted: formatSeconds(defaultSeconds),
		})
	}

	const countdown = () => {
		// Countdown is used as setInterval callback so, due to closure,
		// it will always have reference to initial state (time).
		// To access current state functional state update is needed.

		setTime(prev => {
			if (prev.seconds === 0) {
				stopTimer()
				return prev
			}

			const newSeconds = prev.seconds - 1
			return {
				seconds: newSeconds,
				formatted: formatSeconds(newSeconds),
			}
		})
	}

	const increaseTime = () => {
		setTime(prev => {
			const newSeconds = changeSeconds(prev.seconds, "+")
			return {
				seconds: newSeconds,
				formatted: formatSeconds(newSeconds),
			}
		})
	}

	const decreaseTime = () => {
		if (time.seconds <= 0) return

		setTime(prev => {
			const newSeconds = changeSeconds(prev.seconds, "-")
			return {
				seconds: newSeconds,
				formatted: formatSeconds(newSeconds),
			}
		})
	}

	useEffect(() => {
		if (start) {
			startTimer()
			startCallback()
		}
	})

	useEffect(() => {
		if (reset) {
			resetTimer()
			resetCallback()
		}
	})

	return (
		<div className="timer">
			{(timerRef.current === null) && (
				<button className="strip-css-btn" onClick={decreaseTime}>
					-
				</button>
			)}
			<span className="time">{time.formatted}</span>
			{(timerRef.current === null) && (
				<button className="strip-css-btn" onClick={increaseTime}>
					+
				</button>
			)}

			{/* <br />
			<button onClick={startTimer}>START</button>
			<br />
			<button className="strip-css-btn"
				onClick={resetTimer}
			>
				<i className="fa fa-sync"></i>
			</button> */}
		</div>
	)
}

export default Timer
