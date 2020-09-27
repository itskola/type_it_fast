const getNormalizedNumberOfWords = (text, lang = "en") => {
	const textLength = text.length
	let normalized

	switch (lang) {
		case "en":
			// 5 is the average word length in English language
			normalized = textLength / 5
			break
		default:
			normalized = textLength / 5
	}
	
	return normalized > 0 ? normalized : 1
}

export {
	getNormalizedNumberOfWords
}