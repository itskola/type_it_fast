import React from "react"

import Table from "react-bootstrap/Table"

import "./Statistics.css"

function Statistics({ statistics, textMode }) {
	const characters = statistics.characters
	const words = statistics.words

	let characterAccuracy = 0
	const charactersTyped = characters.correct + characters.incorrect
	if (charactersTyped !== 0)
		characterAccuracy = (characters.correct / charactersTyped) * 100

	let wordAccuracy = 0
	const wordsTyped = words.correct + words.incorrect
	if (wordsTyped !== 0) wordAccuracy = (words.correct / wordsTyped) * 100

	return (
		<div className="statistics-outer-container">
			<div className="statistics-inner-container">
				<Table striped borderless>
					<thead>
						<tr>
							<th className="text-center" colSpan="2">
								WPM 20
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Character accuracy</td>
							<td>{characterAccuracy.toFixed(2)}%</td>
						</tr>
						<tr>
							<td>Word accuracy</td>
							<td>{wordAccuracy.toFixed(2)}%</td>
						</tr>
						<tr>
							<td>Correct words</td>
							<td>{words.correct}</td>
						</tr>
						<tr>
							<td>Incorrect words</td>
							<td>{words.incorrect}</td>
						</tr>
						<tr>
							<td>Text mode</td>
							<td>{textMode}</td>
						</tr>
					</tbody>
				</Table>
			</div>
		</div>
	)
}

export default Statistics
