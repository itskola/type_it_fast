import React from "react"

import Table from "react-bootstrap/Table"

import "./Statistics.css"

function Statistics() {
	return (
		<div className="statistics-outer-container">
			<div className="statistics-inner-container">
				<Table striped borderless>
					<tbody>
						<tr>
							<td>WPM</td>
							<td>20</td>
						</tr>
						<tr>
							<td>Word accuracy</td>
							<td>30%</td>
						</tr>
						<tr>
							<td>Correct words</td>
							<td>24</td>
						</tr>
						<tr>
							<td>Incorrect words</td>
							<td>5</td>
						</tr>
						<tr>
							<td>Text mode</td>
							<td>Words</td>
						</tr>
					</tbody>
				</Table>
			</div>
		</div>
	)
}

export default Statistics
