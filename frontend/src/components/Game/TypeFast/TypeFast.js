import React, { useEffect, useReducer, useRef, useState } from "react"

import { useTextModeContext } from "context/textMode"
import { WordsStatistic, WordsStatisticAction } from "../Statistics/reducer"
import { WordsInfo, WordsInfoAction } from "./reducer"

import TimerWithReset from "../TimerWithReset/TimerWithReset"
import Statistics from "../Statistics/Statistics"
import WordTyped from "./WordTyped/WordTyped"
import Words from "./Words/Words"

import Spinner from "react-bootstrap/Spinner"

import axios from "axios"

import "./TypeFast.css"

function TypeFast() {
	const { textModeState } = useTextModeContext()

	const [waitingResponse, setWaitingResponse] = useState(false)

	const wordsRef = useRef()
	const wordTypedRef = useRef()
	const [wordTyped, setWordTyped] = useState("")
	const [wordTypedDisabled, setWordTypedDisabled] = useState(false)

	const [wordsInfo, setWordsInfo] = useReducer(WordsInfo.setState, WordsInfo.state)
	const [wordsStatistic, setWordsStatistic] = useReducer(
		WordsStatistic.setState,
		WordsStatistic.state
	)
	const [wordCurrent, setWordCurrent] = useState({
		index: 0,
		status: true,
	})

	const [timerState, setTimerState] = useState({
		start: false,
		reset: false,
	})
	const [secondsElapsed, setSecondsElapsed] = useState(0)

	const initializeProgress = text => {
		setWordsInfo(WordsInfoAction.Init(text, textModeState.mode))
		setWordsStatistic(WordsStatisticAction.Init())

		resetComponents()
	}

	const resetProgress = () => {
		setWordsInfo(WordsInfoAction.Reset(textModeState.mode))
		setWordsStatistic(WordsStatisticAction.Reset())

		resetComponents()
	}

	const resetComponents = () => {
		setWordCurrent({ index: 0, status: true })

		setWordTyped("")
		setWordTypedDisabled(false)

		setSecondsElapsed(0)
	}

	const handleInputWithTimer = e => {
		if (e.target.value === " ") return
		if (!timerState.start) {
			setTimerState({ start: true, reset: false })

		}
		handleInput(e)
	}

	const handleInput = ({ target: { value: typed } }) => {
		setWordTyped(typed)

		const wordAt = wordCurrent.index
		const word = wordsInfo.shown[wordAt]

		// user is done with the current word
		if (typed[typed.length - 1] === " ") {
			if (word + " " === typed) {
				setWordsInfo(WordsInfoAction.Correct())
				setWordsStatistic(WordsStatisticAction.Correct(typed))
			} else {
				setWordsInfo(WordsInfoAction.Incorrect())
				setWordsStatistic(WordsStatisticAction.Incorrect(word + " ", typed))
			}

			// check if user is at the last word in a row
			const wordNodes = wordsRef.current.children
			if (
				wordNodes[wordAt].getBoundingClientRect().top < 
				wordNodes[wordAt + 1].getBoundingClientRect().top
			) {
				setWordsInfo(WordsInfoAction.Next(wordAt + 1))
				setWordCurrent({ index: 0, status: true })
			} else {
				setWordCurrent({ index: wordAt + 1, status: true })
			}

			setWordTyped("")
		} else {
			if (typed !== word.substring(0, typed.length))
				setWordCurrent({ ...wordCurrent, status: false })
			else 
				setWordCurrent({ ...wordCurrent, status: true })
		}
	}

	useEffect(() => {
		setWaitingResponse(true)
		setWordTypedDisabled(true)

		axios.get(textModeState.endpoint)
			.then(({ data }) => {
				initializeProgress(data)
			})
			.catch(() => {
				initializeProgress(["---"])
				setWordTypedDisabled(true)
			})
			.finally(() => {
				setWaitingResponse(false)
			})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [textModeState.endpoint])

	useEffect(() => {
		if (!wordTypedDisabled) wordTypedRef.current.focus()
	})

	return (
		<div id="typefast-container" className="group-col">
			{waitingResponse ? (
				<Spinner animation="border" />
			) : (
				<Words ref={wordsRef}
					words={wordsInfo.shown}
					wordsStatus={wordsInfo.status}
					wordCurrent={wordCurrent}
				/>
			)}

			<div className="group-col">
				<WordTyped ref={wordTypedRef}
					disabled={wordTypedDisabled}
					value={wordTyped}
					onChange={handleInputWithTimer}
				/>

				<TimerWithReset
					state={timerState}
					setState={setTimerState}
					onTick={elapsed => setSecondsElapsed(elapsed)}
					onReset={resetProgress}
					onStop={() => {
						setWordTypedDisabled(true)
					}}
				/>

				<Statistics
					statistics={wordsStatistic}
					elapsed={secondsElapsed}
					textMode={textModeState.mode}
				/>
			</div>
		</div>
	)
}

export default TypeFast
