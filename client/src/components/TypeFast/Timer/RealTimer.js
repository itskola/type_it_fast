import React, { useState, useEffect, useRef } from "react"

function RealTimer({ seconds, formatSeconds, onTick = null, onStop = null }) {
	const [_seconds, _setSeconds] = useState(seconds)
	const [started, setStarted] = useState(false)
	const [stopped, setStopped] = useState(false)

	const intervalId = useRef(null)

	const startTimer = () => {
		intervalId.current = setInterval(countdown, 1000)
		setStarted(true)
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
		startTimer()
		return () => stopTimer()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (started && onTick) 
			if (_seconds !== seconds) onTick(seconds - _seconds)
			
		if (stopped && onStop)
			onStop(seconds)
			
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [started, stopped, _seconds])

	return (
		<>
			<span className="time">{formatSeconds(_seconds)}</span>
		</>
	)
}

export default RealTimer
