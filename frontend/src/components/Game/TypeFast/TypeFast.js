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
	const [currentWord, setCurrentWord] = useState({
		index: 0,
		status: true
	})

	const [typedWord, setTypedWord] = useState("")
	const [typeHereDisabled, setTypeHereDisabled] = useState(false)
	const typeHereRef = useRef()

	const resetWordsProgress = () => {
		setWordsStatus([])
		setCurrentWord({ index: 0, status: true })

		setTypedWord("")
		setTypeHereDisabled(false)
	}

	const [timerState, setTimerState] = useState({
		start: false,
		reset: false,
	})

	const [statistics, setStatistics] = useState({
		numberOfWords: 0,
		correctWords: 0
	})

	const handleInputWithTimer = e => {
		if (!timerState.start) {
			setTimerState({
				start: true, reset: false
			})
		}
		handleInput(e)
	}

	const handleInput = ({ target: { value: typed } }) => {
		setTypedWord(typed)
		const atWord = currentWord.index

		if (atWord === words.value.length) return

		// user is done with current word
		if (typed[typed.length - 1] === " ") {
			if (words.value[atWord] + " " === typed)
				setWordsStatus([...wordsStatus, true])
			else 
				setWordsStatus([...wordsStatus, false])

			setTypedWord("")
			setCurrentWord({ index: atWord + 1, status: true })
		}
		else {
			if (typed !== words.value[atWord].substring(0, typed.length))
				setCurrentWord({ ...currentWord, status: false })
			else
				setCurrentWord({ ...currentWord, status: true })
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

	useEffect(() => {
		if (!typeHereDisabled)
			typeHereRef.current.focus()
	})

	return (
		<div id="typefast-outer-container">
			<div id="typefast-inner-container">
				<div className="type-this">
					{words.loading ? (
						<Spinner animation="border" />
					) : (
						<Words 
							words={words.value} wordsStatus={wordsStatus} 
							currentWord={currentWord} 
						/>
					)}
				</div>

				<div className="type-here-container">
					<input ref={typeHereRef} disabled={typeHereDisabled}
						className="strip-css-input type-here"
						type="text" value={typedWord}
						onChange={handleInputWithTimer}
					/>
				</div>

				<TimerWithReset 
					state={timerState} setState={setTimerState}
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
