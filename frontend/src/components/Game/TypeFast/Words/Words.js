import React from "react"

import "./Words.css"

function Words({ words, wordsStatus, wordCurrent }) {
	const wordsJSX = []
	let wordAt

	for (wordAt = 0; wordAt < wordsStatus.length; ++wordAt) {
		wordsJSX.push(
			<span
				key={wordAt}
				className={
					wordsStatus[wordAt] === true
						? "word correct-word"
						: "word incorrect-word"
				}
			>
				{words[wordAt] + " "}
			</span>
		)
	}

	if (wordAt < words.length) {
		let wordCurrentClasses = "word current-word"
		if (!wordCurrent.status) wordCurrentClasses += " incorrect-word"
		wordsJSX.push(
			<span key={wordAt} className={wordCurrentClasses}>
				{words[wordAt] + " "}
			</span>
		)

		for (wordAt = wordAt + 1; wordAt < words.length; ++wordAt) {
			wordsJSX.push(
				<span key={wordAt} className="word">
					{words[wordAt] + " "}
				</span>
			)
		}
	}

	return <>{wordsJSX}</>
}

export default Words
