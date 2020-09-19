import React from "react"

import Spinner from "react-bootstrap/Spinner"

function TypeThis({ text }, ref) {
	const words = text.split(" ")

	return (
		<div className="type-this" ref={ref}>
			{!text ? (
				<Spinner animation="border" role="status">
					<span className="sr-only">Loading...</span>
				</Spinner>
			) : (
				words.map((word, i) => (
					<span key={i} className="word">
						{word + " "}
					</span>
				))
			)}
		</div>
	)
}

export default React.forwardRef(TypeThis)
