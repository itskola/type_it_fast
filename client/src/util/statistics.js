const normalizedNumberOfCharacters = (count, lang = "en") => {
	switch (lang) {
		case "en":
			// 5 is the average word length in English language
			return count / 5
		default:
			return count / 5
	}
}

const _accuracy = (correct, incorrect) => {
	let accuracy = 0

	const total = correct + incorrect
	if (total !== 0) accuracy = correct / total

	return accuracy
}

const _grossWpm = (correctChars, incorrectChars, minutes) =>
	minutes === 0
		? 0
		: normalizedNumberOfCharacters(correctChars + incorrectChars) / minutes

// ================================================================================

const Accuracy = {
	characters: (correct, incorrect) => _accuracy(correct, incorrect),

	words: (correct, incorrect) => _accuracy(correct, incorrect),
}

const Wpm = {
	gross: (correctChars, incorrectChars, minutes) =>
		Math.round(_grossWpm(correctChars, incorrectChars, minutes)),

	net: (correctChars, incorrectChars, minutes) => {
		if (minutes === 0) return 0

		const gross = _grossWpm(correctChars, incorrectChars, minutes)
		const errorRate = incorrectChars / minutes

		const net = gross - errorRate
		if (net < 0) return 0
		return Math.round(net)
	},
}

export { Accuracy, Wpm }
