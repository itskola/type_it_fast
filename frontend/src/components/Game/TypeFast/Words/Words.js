import React from "react"

import "./Words.css"

function Words({ words, wordsStatus }) {
	const wordsArr = []
	for (let i = 0; i < wordsStatus.length; ++i) {
		wordsArr.push(
			<span
				key={i}
				className={
					wordsStatus[i] === true
						? "word correct-word"
						: "word incorrect-word"
				}
			>
				{words[i] + " "}
			</span>
		)
	}

	for (let i = wordsStatus.length; i < words.length; ++i) {
		wordsArr.push(
			<span key={i} className="word">
				{words[i] + " "}
			</span>
		)
	}

	return <>{wordsArr}</>
}

export default Words
