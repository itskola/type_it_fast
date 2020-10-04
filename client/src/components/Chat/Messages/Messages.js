import React, { useRef, useState, useEffect } from "react"

import Message from "./Message"

import "./Messages.css"

function Messages({ messages, user }) {
	const containerRef = useRef()
	const lastScrollTop = useRef(0)

	const [showScrollDown, setShowScrollDown] = useState(false)
	const [dontImmediatelyScrollDown, setDontImmediatelyScrollDown] = useState(false)

	const scroll = () => {
		lastScrollTop.current = containerRef.current.scrollTop

		// scroll to bottom of overflowed div
		containerRef.current.scrollTop = containerRef.current.scrollHeight

		setShowScrollDown(false)
	}

	const handleScroll = () => {
		if (lastScrollTop.current > containerRef.current.scrollTop) {
			setShowScrollDown(true)
		} 
		else if (lastScrollTop.current <= containerRef.current.scrollTop && showScrollDown) {
			setDontImmediatelyScrollDown(true)
			setShowScrollDown(false)
		} 
		else if (dontImmediatelyScrollDown) {
			// keep updating lastScrollTop
			lastScrollTop.current = containerRef.current.scrollTop

			// 5 is for good measure since scroll* and clientHeight round dimensions
			if ((containerRef.current.scrollTop + containerRef.current.clientHeight) + 5 >=
				containerRef.current.scrollHeight) {
				setDontImmediatelyScrollDown(false)
			}
		} 
		else {
			setShowScrollDown(false)
		}
	}

	useEffect(() => {
		if (!dontImmediatelyScrollDown) {
			// if user scrolled to top, don't scroll to bottom
			if (lastScrollTop.current > containerRef.current.scrollTop) {} 
			else scroll()
		}
	})

	return (
		<div className="messages" ref={containerRef} onScroll={handleScroll}>
			{messages.map((msg, i) => (
				<Message key={i} message={msg} user={user} />
			))}
			{showScrollDown && (
				<button className="strip-css-btn scroll-down-btn" onClick={scroll}>
					<i className="fa fa-arrow-down"></i>
				</button>
			)}
		</div>
	)
}

export default Messages
