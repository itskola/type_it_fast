import React from "react"

import Table from "react-bootstrap/Table"

import { Accuracy, Wpm } from "util/statistics"
import { formatSecondsWithUnit } from "util/helper"

import "./Statistics.css"

function Statistics({ statistics, elapsed, textMode, showElapsed = false }) {
	const characters = statistics.characters
	const words = statistics.words

	return (
		<Table className="statistics-container" striped borderless>
			<thead>
				<tr>
					<th className="text-center" colSpan="2">
						WPM{" "}
						{Wpm.net(
							characters.correct,
							characters.incorrect,
							elapsed / 60
						)}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Character accuracy</td>
					<td>
						{(
							Accuracy.characters(
								characters.correct,
								characters.incorrect
							) * 100
						).toFixed(1)}
						%
					</td>
				</tr>
				<tr>
					<td>Word accuracy</td>
					<td>
						{(
							Accuracy.words(words.correct, words.incorrect) * 100
						).toFixed(1)}
						%
					</td>
				</tr>
				<tr>
					<td>Correct words</td>
					<td className="word-correct">{words.correct}</td>
				</tr>
				<tr>
					<td>Incorrect words</td>
					<td className="word-incorrect">{words.incorrect}</td>
				</tr>
				<tr>
					<td>Text mode</td>
					<td>{textMode}</td>
				</tr>
				{showElapsed && (
					<tr>
						<td>Duration</td>
						<td>{formatSecondsWithUnit(elapsed)}</td>
					</tr>
				)}
			</tbody>
		</Table>
	)
}

export default React.memo(Statistics)
