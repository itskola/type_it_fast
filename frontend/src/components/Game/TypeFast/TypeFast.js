import React, { useEffect, useRef, useState } from "react"

import { useTextModeContext } from "../../../context/textMode"

import Spinner from "react-bootstrap/Spinner"

import axios from "axios"

import "./TypeFast.css"

function TypeFast() {
	const { textModeState } = useTextModeContext()
	const [text, setText] = useState("")
	const [typed, setTyped] = useState("")
	const atWord  = useRef(0)

	const typeThis = useRef()
	const typeHere = useRef()

	const handleInput = ({ target: { value } }) => {
		setTyped(value)

		const typeThisNode = typeThis.current
		if (atWord.current === typeThisNode.children.length) return
		
		if (value[value.length - 1] === " ") {
			const currentWord = typeThisNode.children[atWord.current]

			currentWord.classList.remove("current-word")
			if (currentWord.textContent === value)
				currentWord.classList.add("correct-word")
			else
				currentWord.classList.add("incorrect-word")
			
			++atWord.current
			if (atWord.current < typeThisNode.children.length)
				typeThisNode.children[atWord.current].classList.add("current-word")
			
			setTyped("")
		}
	}

	const [loadingText, setLoadingText] = useState(false)

	useEffect(() => {
		setLoadingText(true)
		axios.get(textModeState.endpoint)
			.then(({ data }) => { 
				setText(data)
				setLoadingText(false)
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
					{loadingText ? (
						<Spinner animation="border" />
					) : (
						text.split(" ").map((word, i) => (
							<span key={i} className="word">{word + " "}</span>
						))
					)}
				</div>

				<input ref={typeHere} className="type-here" 
					type="text" value={typed}
					onChange={handleInput}
				/>
			</div>
		</div>
	)
}

export default TypeFast
