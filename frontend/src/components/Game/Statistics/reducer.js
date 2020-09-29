const ActionType = {
	Init: "init",
	Correct: "correct",
	Incorrect: "incorrect",
	Reset: "reset",
}

const WordsStatisticAction = {
	Init: () => ({
		type: ActionType.Init,
	}),
	Correct: word => ({
		type: ActionType.Correct,
		payload: word,
	}),
	Incorrect: (actual, typed) => ({
		type: ActionType.Incorrect,
		payload: { actual, typed },
	}),
	Reset: () => ({
		type: ActionType.Reset,
	}),
}

const _characters = (correct, incorrect) => ({
	correct,
	incorrect,
})

const _words = (correct, incorrect) => ({
	correct,
	incorrect,
})

class WordsStatistic {
	static state = {
		characters: _characters(0, 0),
		words: _words(0, 0),
	}

	static setState = ({ characters: c, words: w }, { type, payload }) => {
		switch (type) {
			case ActionType.Init:
			case ActionType.Reset:
				return {
					characters: _characters(0, 0),
					words: _words(0, 0),
				}
			case ActionType.Correct:
				return {
					characters: _characters(c.correct + payload.length, c.incorrect),
					words: _words(w.correct + 1, w.incorrect),
				}
			case ActionType.Incorrect:
				const actual = payload.actual
				const typed = payload.typed

				let [longer, shorter] = [actual.length, typed.length]
				if (shorter > longer) {
					[longer, shorter] = [typed.length, actual.length]
				}

				let correct = 0
				for (let i = 0; i < shorter; ++i) {
					if (typed[i] === actual[i]) ++correct
				}

				return {
					characters: _characters(
						c.correct + correct,
						c.incorrect + (longer - correct)
					),
					words: _words(w.correct, w.incorrect + 1),
				}
			default:
				console.error(`Action "${type}" is not supported`)
				return {
					characters: c,
					words: w,
				}
		}
	}
}

export { WordsStatistic, WordsStatisticAction }
