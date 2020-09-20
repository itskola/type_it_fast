import React, { useEffect, useRef, useState } from "react"

import { endpoints } from "../../../util/endpoints"

import TypeThis from "./TypeThis"

import axios from "axios"

import "./TypeFast.css"

function TypeFast() {
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
			if (currentWord.innerText === value)
				currentWord.classList.add("correct-word")
			else
				currentWord.classList.add("incorrect-word")
			
			++atWord.current
			if (atWord.current < typeThisNode.children.length)
				typeThisNode.children[atWord.current].classList.add("current-word")
			
			setTyped("")
		}
	}

	useEffect(() => {
		axios.get(endpoints.Sentence)
			.then(({ data }) => { 
				setText(data)
				typeHere.current.focus() 
			})
			.catch(({ result: { data } }) => { setText("-") })
	}, [])

	useEffect(() => {
		if (text) typeThis.current.children[0].classList.add("current-word")
	}, [text])

	return (
		<div id="games" className="scrollbar-hidden">
			<div className="typefast-inner-container">
				<TypeThis ref={typeThis} text={text} />

				<input ref={typeHere} 
					className="type-here" 
					type="text" value={typed} 
					onChange={handleInput}
				/>
			</div>
		</div>
	)
}

export default TypeFast
