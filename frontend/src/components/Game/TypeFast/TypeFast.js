import React, { useEffect, useRef, useState } from "react"

import { useTextModeContext } from "../../../context/textMode"

import Statistics from "../Statistics/Statistics"
import Timer from "../Timer/Timer"

import Spinner from "react-bootstrap/Spinner"

import axios from "axios"

import "./TypeFast.css"

function TypeFast() {
	const { textModeState } = useTextModeContext()

	const [text, setText] = useState({
		value: "",
		loading: true,
	})

	const [startTimer, setStartTimer] = useState(false)
	const [resetTimer, setResetTimer] = useState(false)

	const [statistics, setStatistics] = useState({
		correctWords: 0,
	})

	const [typed, setTyped] = useState("")
	const atWord = useRef(0)

	const typeThis = useRef()
	const typeHere = useRef()

	const handleInput = ({ target: { value } }) => {
		if (!startTimer) setStartTimer(true)

		setTyped(value)

		const typeThisNode = typeThis.current
		if (atWord.current === typeThisNode.children.length) return

		if (value[value.length - 1] === " ") {
			const currentWord = typeThisNode.children[atWord.current]

			currentWord.classList.remove("current-word")
			if (currentWord.textContent === value)
				currentWord.classList.add("correct-word")
			else currentWord.classList.add("incorrect-word")

			++atWord.current
			if (atWord.current < typeThisNode.children.length)
				typeThisNode.children[atWord.current].classList.add("current-word")

			setTyped("")
		}
	}

	useEffect(() => {
		setText(text => ({
			...text,
			loading: true,
		}))

		axios.get(textModeState.endpoint)
			.then(({ data }) => {
				setText({ value: data, loading: false })
				atWord.current = 0
				typeHere.current.focus()
			})
			.catch(() => { setText("-") })
	}, [textModeState.endpoint])

	useEffect(() => {
		if (text) typeThis.current.children[0].classList.add("current-word")
	}, [text])

	return (
		<div className="typefast-outer-container">
			<div className="typefast-inner-container">
				<div ref={typeThis} className="type-this">
					{text.loading ? (
						<Spinner animation="border" />
					) : (
						text.value.split(" ").map((word, i) => (
							<span key={i} className="word">
								{word + " "}
							</span>
						))
					)}
				</div>

				<Timer
					start={startTimer} startCallback={() => setStartTimer(false)}
					reset={resetTimer} resetCallback={() => setResetTimer(false)}
				/>

				<button
					className="reset-timer strip-css-btn"
					onClick={() => setResetTimer(true)}
				>
					<i className="fa fa-sync"></i>
				</button>

				<input ref={typeHere}
					className="strip-css-input type-here"
					type="text" value={typed}
					onChange={handleInput}
				/>

				<Statistics />
			</div>
		</div>
	)
}

export default TypeFast
