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

// =====================================================

const changeSeconds = (seconds, op) => {
	let change = 0
	switch (op) {
		case "+":
			change = 30
			if (seconds < 5) change = 1
			else if (seconds < 15) change = 5
			else if (seconds < 60) change = 15
			else if (seconds >= 600) change = 300
			else if (seconds >= 300) change = 60
			break
		case "-":
			change = -30
			if (seconds <= 5) change = -1
			else if (seconds <= 15) change = -5
			else if (seconds <= 60) change = -15
			else if (seconds > 600) change = -300
			else if (seconds > 300) change = -60
			break
		default:
			break
	}
	return seconds + change
}

const formatSeconds = seconds => {
	const unitsOfTime = []

	unitsOfTime.push(Math.floor(seconds / (60 * 60))) // hours

	const remainingMinutes = seconds % (60 * 60)
	unitsOfTime.push(Math.floor(remainingMinutes / 60)) // minutes

	const remainingSeconds = remainingMinutes % 60
	unitsOfTime.push(Math.ceil(remainingSeconds)) // seconds

	let startFrom = unitsOfTime.findIndex(part => part !== 0)
	if (startFrom === -1) return "0"

	let formatted = unitsOfTime[startFrom] + ""
	for (let i = startFrom + 1; i < unitsOfTime.length; ++i) {
		if (unitsOfTime[i] < 10) formatted += `:0${unitsOfTime[i]}`
		else formatted += `:${unitsOfTime[i]}`
	}
	return formatted
}

const unitOfTime = seconds => {
	let unit = ""
	if (seconds < 60) {
		if (seconds === 1) unit = "second"
		else unit = "seconds"
	} else if (seconds >= 60 && seconds < 3600) {
		if (seconds === 60) unit = "minute"
		else unit = "minutes"
	} else {
		if (seconds === 3600) unit = "hour"
		else unit = "hours"
	}
	return unit
}

const formatSecondsWithUnit = seconds => {
	const formatted = formatSeconds(seconds)
	const unit = unitOfTime(seconds)

	return formatted + " " + unit
}

export {
	shuffleArray, rangeArray,
	changeSeconds, formatSeconds, unitOfTime, formatSecondsWithUnit,
}
