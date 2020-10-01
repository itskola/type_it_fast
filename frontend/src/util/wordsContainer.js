import { rangeArray, shuffleArray } from "./helper"

// class TextContainer {}

// React.StrictMode causes issues with both of text containers (words out of order)
// this is due to offset in each of the containers being calculated twice

class SentencesContainer /* extends TextContainer */ {
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

class WordsContainer /* extends TextContainer */ {
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

export { SentencesContainer, WordsContainer }
