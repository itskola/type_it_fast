import React from "react"

import Table from "react-bootstrap/Table"

export default function Calculations() {
	return (
		<section className="info-section">
			<Table borderless className="calculations">
				<tbody>
					<tr>
						<td>Correct words</td>
						<td>Number of correctly typed words</td>
					</tr>
					<tr>
						<td>Incorrect words</td>
						<td>Number of incorrectly typed words</td>
					</tr>
					<tr>
						<td>Word accuracy</td>
						<td>
							Correct words / <br/>  (Correct words + Incorrect words)
							<br /> * 100
						</td>
					</tr>
					<tr>
						<td>
							Correct characters<sup>1</sup>
						</td>
						<td>Number of correctly typed characters</td>
					</tr>
					<tr>
						<td>Incorrect characters</td>
						<td>Number of incorrectly typed characters</td>
					</tr>
					<tr>
						<td>Character accuracy</td>
						<td>
							Correct characters / <br/> (Correct characters + Inorrect
							characters)
							<br /> * 100
						</td>
					</tr>
				</tbody>
			</Table>

			<Table borderless className="calculations">
				<tbody>
					<tr>
						<td>Gross WPM</td>
						<td>
							norm(Correct characters + Inorrect characters)
							<sup>2</sup> / Time in minutes
						</td>
					</tr>
					<tr>
						<td>Error rate</td>
						<td>Incorrect characters / Time in minutes</td>
					</tr>
					<tr>
						<td>
							Net WPM<sup>3</sup>
						</td>
						<td>max(0, Gross WPM - Error rate)</td>
					</tr>
				</tbody>
			</Table>

			<p className="paragraph">
				<sup>1</sup>Calculation of <span>correct characters</span> takes into
				account characters <span>at the same position</span> in the actual
				word and word that you typed (regardless of the fact whether the
				actual word and typed word match).
			</p>

			<p className="paragraph">
				<sup>2</sup>
				<span>norm(Correct characters + Inorrect characters)</span> denotes
				divison of total number of typed characters with{" "}
				<span>average word length</span> in a given language. In case of
				English language that is 5.
			</p>

			<p className="paragraph">
				<sup>3</sup>
				<span>WPM that is shown on screen is Net WPM</span>
			</p>
		</section>
	)
}
