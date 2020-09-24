import React, { useEffect, useRef, useState } from "react"

import { useTextModeContext } from "../../../context/textMode"

import Words from "./Words/Words"
import Statistics from "../Statistics/Statistics"
import Timer from "../Timer/Timer"

import Spinner from "react-bootstrap/Spinner"

import axios from "axios"

import "./TypeFast.css"

function TypeFast() {
	const { textModeState } = useTextModeContext()

	const [words, setWords] = useState({
		value: [],
		loading: true,
	})

	const [timerState, setTimerState] = useState({
		start: false,
		running: false,
		reset: false,
		// stop: false
	})

	// const [statistics, setStatistics] = useState({correctWords: 0})

	const [typed, setTyped] = useState("")

	const typeHere = useRef()

	const handleInputWithTimer = e => {
		if (!timerState.running) {
			setTimerState({
				...timerState, start: true,
			})
		}
		handleInput(e)
	}

	const [wordIndex, setWordIndex] = useState(0)
	const [wordsStatus, setWordsStatus] = useState([])

	const handleInput = ({ target: { value } }) => {
		setTyped(value)

		if (wordIndex === words.value.length) return

		if (value[value.length - 1] === " ") {
			if (words.value[wordIndex] + " " === value)
				setWordsStatus([...wordsStatus, true])
			else
				setWordsStatus([...wordsStatus, false])

			setWordIndex(wordIndex + 1)

			setTyped("")
		}
	}

	useEffect(() => {
		setWords(words => ({
			...words, loading: true,
		}))

		axios.get(textModeState.endpoint)
			.then(({ data }) => {
				setWords({ value: data.split(" "), loading: false })
				setWordIndex(0) // add current-word class somehow
				typeHere.current.focus()
			})
			.catch(() => setWords({value: ["-"], loading: false}))
	}, [textModeState.endpoint])

	return (
		<div id="typefast-outer-container">
			<div id="typefast-inner-container">
				<div className="type-this">
					{words.loading ? (
						<Spinner animation="border" />
					) : (
						<Words words={words.value} wordsStatus={wordsStatus}/>
					)}
				</div>

				<Timer
					start={timerState.start}
					startCallback={() =>
						setTimerState({
							...timerState,
							start: false, running: true,
						})
					}
					reset={timerState.reset}
					resetCallback={() => {
						setTimerState({
							...timerState,
							running: false, reset: false,
						})
						setTyped("")
						setWordIndex(0)
						setWordsStatus([])
						typeHere.current.focus()
					}}
				/>

				<button 
					className="strip-css-btn reset-timer"
					onClick={() =>
						setTimerState({ ...timerState, reset: true })
					}
				>
					<i className="fa fa-sync"></i>
				</button>

				<input ref={typeHere}
					className="strip-css-input type-here"
					type="text" value={typed}
					onChange={handleInputWithTimer}
				/>

				<Statistics />
			</div>
		</div>
	)
}

export default TypeFast
