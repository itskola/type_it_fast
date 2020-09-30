const shuffleArray = array => {
	for (let i = array.length - 1; i > 0; --i) {
		const j = Math.floor(Math.random() * (i + 1))
		;[array[i], array[j]] = [array[j], array[i]]
	}
}

const rangeArray = (from, to) => {
	const arr = []
	for (let i = from; i < to; ++i) arr.push(i)
	return arr
}

export { shuffleArray, rangeArray }
