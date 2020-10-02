import React, { useState, useEffect } from "react"

import Statistics from "components/TypeFast/Statistics/Statistics"

import Modal from "react-bootstrap/Modal"

import { endpoints } from "util/endpoints"
import axios from "axios"

import "./Results.css"

function Results({ show, setShow }) {
	const [results, setResults] = useState([])

	useEffect(() => {
		// if (show === false) return

		axios.get(endpoints.Results)
			.then(({ data }) => setResults(data))
			.catch(() => {})
	}, [show])

	return (
		<Modal show={show} onHide={() => setShow(false)}>
			<Modal.Header closeButton>
				<Modal.Title>
					<i className="title-icon fa fa-list-alt"></i>
					Your last saved results
				</Modal.Title>
			</Modal.Header>

			<Modal.Body className="p-0"
				style={{ maxHeight: "calc(100vh - 150px)", overflowY: "auto" }}
			>
				<div id="results">
					{results.map((results, i) => (
						<Statistics key={i}
							statistics={results.statistics}
							elapsed={results.seconds}
							showElapsed={true}
							textMode={results.textMode}
						/>
					))}
				</div>
			</Modal.Body>
		</Modal>
	)
}

export default Results
