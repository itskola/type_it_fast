import React, { useEffect, useReducer, useRef, useState } from "react"

import { useTextModeContext } from "../../../context/textMode"
import { WordsStatistic, WordsStatisticAction } from "../Statistics/reducer"
import { WordsInfo, WordsInfoAction } from "./reducer"

import TimerWithReset from "../TimerWithReset/TimerWithReset"
import Statistics from "../Statistics/Statistics"
import Words from "./Words/Words"

import Spinner from "react-bootstrap/Spinner"

import axios from "axios"

import "./TypeFast.css"

function TypeFast() {
	const { textModeState } = useTextModeContext()

	const [waitingResponse, setWaitingResponse] = useState(false)

	const typeThisRef = useRef()
	const typeHereRef = useRef()
	const [typedWord, setTypedWord] = useState("")
	const [typeHereDisabled, setTypeHereDisabled] = useState(false)

	const [wordsInfo, setWordsInfo] = useReducer(
		WordsInfo.setState, WordsInfo.state
	)
	const [wordsStatistic, setWordsStatistic] = useReducer(
		WordsStatistic.setState, WordsStatistic.state
	)
	const [wordCurrent, setWordCurrent] = useState({ 
		index: 0, status: true 
	})

	const [timerState, setTimerState] = useState({
		start: false, reset: false,
	})
	const [secondsElapsed, setSecondsElapsed] = useState(0)

	const initializeProgress = (text) => {
		resetProgress()
		setWordsInfo(WordsInfoAction.Init(text))
		setWordsStatistic(WordsStatisticAction.Init())
	}

	const resetProgress = () => {
		setWordsInfo(WordsInfoAction.Reset())
		setWordsStatistic(WordsStatisticAction.Reset())
		setWordCurrent({ index: 0, status: true })

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

		const wordAt = wordCurrent.index
		const word = wordsInfo.shown[wordAt]

		// user is done with current word
		if (typed[typed.length - 1] === " ") {
			if (word + " " === typed) {
				setWordsInfo(WordsInfoAction.Correct())
				setWordsStatistic(WordsStatisticAction.Correct(typed))
			} else {
				setWordsInfo(WordsInfoAction.Incorrect())
				setWordsStatistic(WordsStatisticAction.Incorrect(word + " ", typed))
			}

			setTypedWord("")

			const typeThisNode = typeThisRef.current
			let totalChildren = 0
			for (let i = 0; i <= wordAt + 1; ++i) {
				totalChildren += typeThisNode.children[i].offsetWidth
			}

			if (totalChildren >= typeThisNode.offsetWidth) {
				setWordsInfo(WordsInfoAction.Next(wordAt + 1))
				setWordCurrent({ index: 0, status: true })
			} else {
				setWordCurrent({ index: wordAt + 1, status: true })
			} 
		} else {
			if (typed !== word.substring(0, typed.length))
				setWordCurrent({ ...wordCurrent, status: false })
			else 
				setWordCurrent({ ...wordCurrent, status: true })
		}
	}

	useEffect(() => {
		setWaitingResponse(true)
		setTypeHereDisabled(true)

		axios.get(textModeState.endpoint)
			.then(({ data }) => {
				initializeProgress(data)
			})
			.catch(() => {
				initializeProgress("---")
				setTypeHereDisabled(true)
			})
			.finally(() => {
				setWaitingResponse(false)
			})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [textModeState.endpoint])

	useEffect(() => {
		if (!typeHereDisabled) typeHereRef.current.focus()
	})

	return (
		<div id="typefast-container" className="group-col">
			<div ref={typeThisRef} className="type-this">
				{waitingResponse ? (
					<Spinner animation="border" />
				) : (
					<Words
						words={wordsInfo.shown}
						wordsStatus={wordsInfo.status}
						wordCurrent={wordCurrent}
					/>
				)}
			</div>

			<div className="group-col">
				<div>
					<input ref={typeHereRef} type="text"
						className="strip-css-input type-here"
						disabled={typeHereDisabled}
						value={typedWord}
						onChange={handleInputWithTimer}
						onPaste={e => {
							e.preventDefault()
							return false
						}}
					/>
				</div>

				<TimerWithReset
					state={timerState} setState={setTimerState}
					onTick={elapsed => setSecondsElapsed(elapsed)}
					onReset={resetProgress}
					onStop={() => {
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
	)
}

export default TypeFast
