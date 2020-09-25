import React, { useEffect, useRef, useState } from "react"

import { useTextModeContext } from "../../../context/textMode"

import Statistics from "../Statistics/Statistics"
import Timer from "../Timer/Timer"
import Words from "./Words/Words"

import Spinner from "react-bootstrap/Spinner"

import axios from "axios"

import "./TypeFast.css"

function TypeFast() {
	const { textModeState } = useTextModeContext()

	const [words, setWords] = useState({
		value: [],
		loading: true,
	})
	const [wordsStatus, setWordsStatus] = useState([])
	const [typedWord, setTypedWord] = useState("")
	const typeHere = useRef()

	const resetWordsProgress = () => {
		setWordsStatus([])
		setTypedWord("")
		typeHere.current.focus()
	}

	const [timerState, setTimerState] = useState({
		start: false,
		running: false,
		reset: false
	})

	// const [statistics, setStatistics] = useState({correctWords: 0})

	const handleInputWithTimer = e => {
		if (!timerState.running) {
			setTimerState({
				...timerState, start: true,
			})
		}
		handleInput(e)
	}

	const handleInput = ({ target: { value } }) => {
		setTypedWord(value)

		if (wordsStatus.length === words.value.length) return

		if (value[value.length - 1] === " ") {
			if (words.value[wordsStatus.length] + " " === value)
				setWordsStatus([...wordsStatus, true])
			else
				setWordsStatus([...wordsStatus, false])

			setTypedWord("")
		}
	}

	useEffect(() => {
		setWords(words => ({
			...words, loading: true,
		}))

		axios.get(textModeState.endpoint)
			.then(({ data }) => {
				setWords({ value: data.split(" "), loading: false })
				resetWordsProgress()
			})
			.catch(() => { 
				setWords({value: ["---"], loading: false})
				resetWordsProgress()
			})
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
						resetWordsProgress()
					}}
				/>

				<button 
					className="strip-css-btn reset-timer"
					onClick={() => setTimerState({ ...timerState, reset: true }) }
				>
					<i className="fa fa-sync"></i>
				</button>

				{/* try putting input in Component and use memo to stop rendering TypeFast every time */}
				<input ref={typeHere}
					className="strip-css-input type-here"
					type="text" value={typedWord}
					onChange={handleInputWithTimer}
				/>

				<Statistics />
			</div>
		</div>
	)
}

export default TypeFast
