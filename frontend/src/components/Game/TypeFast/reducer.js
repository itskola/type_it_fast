import { rangeArray, shuffleArray } from "../../../util/helper"
import { TextModeAction } from "../../../context/textMode"

const ActionType = {
	Init: "init",
	Correct: "correct",
	Incorrect: "incorrect",
	Next: "next",
	Reset: "reset",
}

const WordsInfoAction = {
	Init: (text, mode) => ({
		type: ActionType.Init,
		payload: { data: text, mode },
	}),
	Correct: () => ({
		type: ActionType.Correct,
	}),
	Incorrect: () => ({
		type: ActionType.Incorrect,
	}),
	Next: count => ({
		type: ActionType.Next,
		payload: count,
	}),
	Reset: mode => ({
		type: ActionType.Reset,
		payload: mode,
	}),
}

let NumberOfShownWords = 30

class SentencesMode {
	constructor(sentences) {
		this.data = []
		this.startingIndexes = []
		this.offset = 0

		const range = rangeArray(0, sentences.length)
		shuffleArray(range)

		let totalLenght = 0
		range.forEach(i => {
			const wordsInSentence = sentences[i].split(" ")
			wordsInSentence.forEach(word => {
				this.data.push(word)
			})

			this.startingIndexes.push(totalLenght)
			totalLenght += wordsInSentence.length
		})
	}

	get length() {
		return this.data.length
	}

	init(count) {
		this.reset()
		return this.next(count, [])
	}

	next(count, words) {
		words = words.slice(count)

		for (let i = this.offset; i < this.offset + count; ++i) {
			words.push(this.data[i % this.length])
		}

		this.offset += count
		if (this.offset >= this.length) this.offset -= this.length

		return words
	}

	reset() {
		this.offset = this.startingIndexes.find(start => start >= this.offset) || 0
	}
}

class WordsMode {
	constructor(words) {
		this.data = words
		this.offset = 0
	}

	get length() {
		return this.data.length
	}

	init(count) {
		this.reset()
		return this.next(count, [])
	}

	next(count, words) {
		words = words.slice(count)
		for (let i = this.offset; i < this.offset + count; ++i) {
			words.push(this.data[i % this.length])
		}

		this.offset += count
		if (this.offset >= this.length) this.offset -= this.length

		return words
	}

	reset() {
		shuffleArray(this.data)
		this.offset = 0
	}
}

let textMode = null

class WordsInfo {
	static state = {
		shown: [],
		status: [],
	}

	static setState = (state, { type, payload }) => {
		switch (type) {
			case ActionType.Init:
				if (payload.mode === TextModeAction.Mode.Sentences) {
					textMode = new SentencesMode(payload.data)
				} else {
					textMode = new WordsMode(payload.data)
				}

				return {
					shown: textMode.init(NumberOfShownWords),
					status: [],
				}
			case ActionType.Correct:
				return {
					...state,
					status: [...state.status, true],
				}
			case ActionType.Incorrect:
				return {
					...state,
					status: [...state.status, false],
				}
			case ActionType.Next:
				return {
					shown: textMode.next(payload, state.shown),
					status: [],
				}
			case ActionType.Reset:
				textMode.reset()

				return {
					shown: textMode.init(NumberOfShownWords),
					status: [],
				}
			default:
				console.error(`Action "${type}" is not supported`)
				return state
		}
	}
}

export { WordsInfo, WordsInfoAction }
