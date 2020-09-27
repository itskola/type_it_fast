import React, { useEffect, useReducer, useRef, useState } from "react"

import { useTextModeContext } from "../../../context/textMode"
import { WordsStatistic, WordsStatisticAction } from "../Statistics/reducer"

import TimerWithReset from "../TimerWithReset/TimerWithReset"
import Statistics from "../Statistics/Statistics"
import Words from "./Words/Words"

import Spinner from "react-bootstrap/Spinner"

import axios from "axios"

import "./TypeFast.css"

function TypeFast() {
	const { textModeState } = useTextModeContext()

	const [words, setWords] = useState({ 
		value: [], loading: true 
	})
	const [wordsStatus, setWordsStatus] = useState([])
	const [currentWord, setCurrentWord] = useState({ 
		index: 0, status: true 
	})

	const [typedWord, setTypedWord] = useState("")
	const [typeHereDisabled, setTypeHereDisabled] = useState(false)
	const typeHereRef = useRef()

	const [timerState, setTimerState] = useState({
		start: false, reset: false
	})
	const [secondsElapsed, setSecondsElapsed] = useState(0)

	const [wordsStatistic, setWordsStatistic] = useReducer(
		WordsStatistic.setState, WordsStatistic.state
	)

	const initializeProgress = text => {
		resetProgress()
		setWordsStatistic(WordsStatisticAction.Init(text))
	}

	const resetProgress = () => {
		setWordsStatus([])
		setCurrentWord({ index: 0, status: true })
		setWordsStatistic(WordsStatisticAction.Reset())
		setSecondsElapsed(0)

		setTypedWord("")
		setTypeHereDisabled(false)
	}

	const handleInputWithTimer = e => {
		if (!timerState.start)
			setTimerState({ start: true, reset: false })
		handleInput(e)
	}

	const handleInput = ({ target: { value: typed } }) => {
		setTypedWord(typed)
		const atWord = currentWord.index

		if (atWord === words.value.length) return

		// user is done with current word
		if (typed[typed.length - 1] === " ") {
			if (words.value[atWord] + " " === typed) {
				setWordsStatus([...wordsStatus, true])
				setWordsStatistic(WordsStatisticAction.Correct(typed))
			} else {
				setWordsStatus([...wordsStatus, false])
				setWordsStatistic(
					WordsStatisticAction.Incorrect(words.value[atWord] + " ", typed)
				)
			}

			setTypedWord("")
			setCurrentWord({ index: atWord + 1, status: true })
		} else {
			if (typed !== words.value[atWord].substring(0, typed.length))
				setCurrentWord({ ...currentWord, status: false })
			else 
				setCurrentWord({ ...currentWord, status: true })
		}
	}

	useEffect(() => {
		setWords(words => ({
			...words, loading: true,
		}))

		axios.get(textModeState.endpoint)
			.then(({ data }) => {
				setWords({ value: data.split(" "), loading: false })
				initializeProgress(data)
			})
			.catch(() => {
				setWords({ value: ["---"], loading: false })
				initializeProgress("---")
				setTypeHereDisabled(true)
			})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [textModeState.endpoint])

	useEffect(() => {
		if (!typeHereDisabled) typeHereRef.current.focus()
	})

	return (
		<div id="typefast-outer-container">
			<div id="typefast-inner-container">
				<div className="type-this">
					{words.loading ? (
						<Spinner animation="border" />
					) : (
						<Words
							words={words.value}
							wordsStatus={wordsStatus}
							currentWord={currentWord}
						/>
					)}
				</div>
	
				<div className="group-col">
					<div>
						<input ref={typeHereRef} type="text" 
							className="strip-css-input type-here"
							disabled={typeHereDisabled} 
							value={typedWord} onChange={handleInputWithTimer}
						/>
					</div>
	
					<TimerWithReset
						state={timerState} setState={setTimerState}
						onTick={elapsed => {
							setSecondsElapsed(elapsed)
						}}
						onReset={() => {
							resetProgress()
						}}
						onStop={() => {
							setTypedWord("")
							setTypeHereDisabled(true)
						}}
					/>

					<Statistics
						statistics={wordsStatistic}
						elapsed={secondsElapsed}
						textMode={textModeState.mode}
					/>
				</div>
			</div>
		</div>
	)
}

export default TypeFast
