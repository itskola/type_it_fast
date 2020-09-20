import React, { useRef, useState } from "react"

import "./Input.css"

function Input({ onChange, onClick }) {
	const [text, setText] = useState("")
	const msgTypeRef = useRef()

	const [focusClass, setFocusClass] = useState("")

	const handleChange = e => {
		msgTypeRef.current.style.height = "auto"
		msgTypeRef.current.style.height = `${1 + msgTypeRef.current.scrollHeight}px`
		setText(e.target.value)

		if (onChange) onChange(e)
	}

	const handleKeyPress = e => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault()
			if (onClick(e)) {
				setText("")
				msgTypeRef.current.style.height = "auto"
			}
		}
	}

	return (
		<div className={`message-box ${focusClass}`}>
			<textarea ref={msgTypeRef} 
				className="mb-none message-type" 
				value={text} placeholder="send a message" rows="1"
				onChange={handleChange}
				onKeyPress={handleKeyPress}
				onFocus={() => { setFocusClass("message-focus") }}
				onBlur={() => { setFocusClass("") }}
			></textarea>
			<div className="message-send-container">
				<button 
					className={`mb-none message-send ${focusClass}`} 
					onClick={onClick}
				>
					<i className="fa fa-paper-plane"></i>
				</button>
			</div>
		</div>
	)
}

export default Input