const ActionType = {
	Init: "init",
	Correct: "correct",
	Incorrect: "incorrect",
	Reset: "reset",
}

const WordsStatisticAction = {
	Init: text => ({
		type: ActionType.Init,
		payload: text,
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

const _characters = (total, correct, incorrect) => ({
	total, correct, incorrect,
})

const _words = (total, correct, incorrect) => ({
	total, correct, incorrect,
})

class WordsStatistic {
	static state = {
		characters: _characters(0, 0, 0),
		words: _words(0, 0, 0),
	}

	static setState = (state, { type, payload }) => {
		switch (type) {
			case ActionType.Init:
				return {
					characters: _characters(payload.length, 0, 0),
					words: _words(payload.split(" ").length, 0, 0),
				}
			case ActionType.Correct:
				return {
					characters: {
						...state.characters,
						correct: state.characters.correct + payload.length,
					},
					words: {
						...state.words,
						correct: state.words.correct + 1,
					},
				}
			case ActionType.Incorrect:
				const actual = payload.actual
				const typed = payload.typed

				let longer = actual.length
				let shorter = typed.length
				if (shorter > longer) {
					longer = typed.length
					shorter = actual.length
				}

				let correct = 0
				for (let i = 0; i < shorter; ++i) {
					if (typed[i] === actual[i]) ++correct
				}

				return {
					characters: {
						...state.characters,
						correct: state.characters.correct + correct,
						incorrect: state.characters.incorrect + (longer - correct),
					},
					words: {
						...state.words,
						incorrect: state.words.incorrect + 1,
					},
				}
			case ActionType.Reset:
				return {
					characters: _characters(0, 0, 0),
					words: _words(0, 0, 0),
				}
			default:
				console.error(`Action "${type}" is not supported`)
				return state
		}
	}
}

export { WordsStatistic, WordsStatisticAction }
