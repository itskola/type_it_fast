import React, { useRef, useEffect } from "react"

import Message from "./Message"

import "./Messages.css"

function Messages({ messages, user }) {
	const msgRef = useRef()
	const lastScrollTop = useRef(0)

	useEffect(() => {
		// if user scrolled to top, don't scroll to bottom
		if (lastScrollTop.current > msgRef.current.scrollTop) return

		lastScrollTop.current = msgRef.current.scrollTop

		// scroll to bottom of overflowed div
		msgRef.current.scrollTop = msgRef.current.scrollHeight
	})

	return (
		<div className="messages scrollbar-hidden" ref={msgRef}>
			{messages.map((msg, i) => (
				<Message key={i} message={msg} user={user} />
			))}
		</div>
	)
}

export default Messages
