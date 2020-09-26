import React from "react"

import "./Words.css"

function Words({ words, wordsStatus, currentWord }) {
	const wordsJSX = []
	let atWord

	for (atWord = 0; atWord < wordsStatus.length; ++atWord) {
		wordsJSX.push(
			<span
				key={atWord}
				className={
					wordsStatus[atWord] === true
						? "word correct-word"
						: "word incorrect-word"
				}
			>
				{words[atWord] + " "}
			</span>
		)
	}

	if (atWord < words.length) {
		let currentWordClasses = "word current-word"
		if (!currentWord.status)  currentWordClasses += " incorrect-word"
		wordsJSX.push(
			<span key={atWord} className={currentWordClasses}>
				{words[atWord] + " "}
			</span>
		)

		for (atWord = atWord + 1; atWord < words.length; ++atWord) {
			wordsJSX.push(
				<span key={atWord} className="word">
					{words[atWord] + " "}
				</span>
			)
		}
	}

	return <>{wordsJSX}</>
}

export default Words
