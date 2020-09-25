import React, { useState, useEffect, useRef } from "react"

function RealTimer({ seconds, formatSeconds, onStop = null }) {
	const [_seconds, _setSeconds] = useState(seconds)
	const [stopped, setStopped] = useState(false)

	const intervalId = useRef(null)

	const startTimer = () => {
		intervalId.current = setInterval(countdown, 1000)
	}

	const stopTimer = () => {
		clearInterval(intervalId.current)
		setStopped(true)
	}

	const countdown = () => {
		_setSeconds(prevSeconds => {
			const newSeconds = prevSeconds - 1
			if (newSeconds === 0) stopTimer()

			return newSeconds
		})
	}

	useEffect(() => {
		if (stopped)
			if (onStop) onStop()
	})

	useEffect(() => {
		startTimer()
		return () => stopTimer()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []) 

	return (
		<>
			<span className="time">{formatSeconds(_seconds)}</span>
		</>
	)
}

export default RealTimer
