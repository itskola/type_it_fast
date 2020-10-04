import React, { useEffect, useState } from "react"
import { Duration } from "context/duration"

import RealTimer from "./RealTimer"
import MockTimer from "./MockTimer"

import { changeSeconds, formatSeconds } from "util/helper"

import "./Timer.css"

const timerLimit = {
	lower: 5, upper: 3600
}

function Timer({ start, reset, onTick = null, onReset = null, onStop = null }) {
	const [seconds, setSeconds] = useState(Duration.Get())

	const decreaseTime = () => {
		if (seconds <= timerLimit.lower) return
		
		setSeconds(prevSeconds => {
			const newSeconds = changeSeconds(prevSeconds, "-")

			Duration.Set(newSeconds)
			return newSeconds
		})
	}

	const increaseTime = () => {
		if (seconds >= timerLimit.upper) return

		setSeconds(prevSeconds => {
			const newSeconds = changeSeconds(prevSeconds, "+")

			Duration.Set(newSeconds)
			return newSeconds
		})
	}

	useEffect(() => {
		if (reset && onReset) onReset()
	})

	return (
		<div className="timer">
			{start && !reset ? (
				<RealTimer
					seconds={seconds}
					formatSeconds={formatSeconds}
					onTick={onTick}
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
