import React from "react"

import "./Words.css"

function Words({ words, wordsStatus, wordCurrent }, ref) {
	const wordsJSX = []
	let wordAt
	
	for (wordAt = 0; wordAt < wordsStatus.length; ++wordAt) {
		wordsJSX.push(
			<span
				key={wordAt}
				className={
					wordsStatus[wordAt] === true
						? "word word-correct"
						: "word word-incorrect"
				}
			>
				{words[wordAt] + " "}
			</span>
		)
	}
	
	if (wordAt < words.length) {
		let wordCurrentClasses = "word word-current"
		if (!wordCurrent.status) wordCurrentClasses += " word-incorrect"
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

	return (
		<div ref={ref} id="words">
			{wordsJSX}
		</div>
	)
}

export default React.forwardRef(Words)
