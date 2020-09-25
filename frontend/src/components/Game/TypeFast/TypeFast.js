import React, { useEffect, useRef, useState } from "react"

import { useTextModeContext } from "../../../context/textMode"

import TimerWithReset from "../TimerWithReset/TimerWithReset"
import Statistics from "../Statistics/Statistics"
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

	const [typeHereDisabled, setTypeHereDisabled] = useState(false)
	const typeHereRef = useRef()

	const resetWordsProgress = () => {
		setWordsStatus([])

		setTypedWord("")
		setTypeHereDisabled(false)
		typeHereRef.current.focus()
	}

	const [timerState, setTimerState] = useState({
		start: false,
		reset: false,
	})

	// const [statistics, setStatistics] = useState({correctWords: 0})

	const handleInputWithTimer = e => {
		if (!timerState.start) {
			setTimerState({
				start: true, reset: false
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
			else setWordsStatus([...wordsStatus, false])

			setTypedWord("")
		}
	}

	useEffect(() => {
		setWords(words => ({
			...words,
			loading: true,
		}))

		axios.get(textModeState.endpoint)
			.then(({ data }) => {
				setWords({ value: data.split(" "), loading: false })
				resetWordsProgress()
			})
			.catch(() => {
				setWords({ value: ["---"], loading: false })
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
						<Words words={words.value} wordsStatus={wordsStatus} />
					)}
				</div>

				<input ref={typeHereRef} disabled={typeHereDisabled}
					className="strip-css-input type-here"
					type="text" value={typedWord}
					onChange={handleInputWithTimer}
				/>

				<TimerWithReset state={timerState} setState={setTimerState}
					onReset={() => {
						resetWordsProgress()
					}}
					onStop={() => {
						setTypedWord("")
						setTypeHereDisabled(true)
					}}
				/>

				<Statistics />
			</div>
		</div>
	)
}

export default TypeFast
