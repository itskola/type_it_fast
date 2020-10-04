import React, { useState, useEffect } from "react"

import Statistics from "components/TypeFast/Statistics/Statistics"

import Spinner from "react-bootstrap/Spinner"
import Modal from "react-bootstrap/Modal"

import { endpoints } from "util/endpoints"
import axios from "axios"

import "./Results.css"

function Results({ show, setShow }) {
	const [results, setResults] = useState([])
	const [waitingResponse, setWaitingResponse] = useState(false)

	useEffect(() => {
		if (show === false) return

		setWaitingResponse(true)
		axios.get(endpoints.Results)
			.then(({ data }) => setResults(data))
			.catch(() => {})
			.finally(() => setWaitingResponse(false))
	}, [show])

	return (
		<Modal show={show} onHide={() => setShow(false)}>
			<Modal.Header closeButton>
				<Modal.Title>
					<i className="title-icon fa fa-list-alt"></i>
					Your last saved results
				</Modal.Title>
			</Modal.Header>

			<Modal.Body
				className="p-0"
				style={{ maxHeight: "calc(100vh - 150px)", overflowY: "auto" }}
			>
				<div id="results">
					{waitingResponse ? (
						<div className="results-placeholder">
							<Spinner animation="border" />
						</div>
					) : results.length === 0 ? (
						<h3 className="text-center p-2">---</h3>
					) : (
						results.map((results, i) => (
							<Statistics key={i}
								statistics={results.statistics}
								elapsed={results.seconds}
								showElapsed={true}
								textMode={results.textMode}
							/>
						))
					)}
				</div>
			</Modal.Body>
		</Modal>
	)
}

export default Results
