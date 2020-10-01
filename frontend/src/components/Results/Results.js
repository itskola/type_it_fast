import React, { useEffect } from "react"

import { endpoints } from "util/endpoints"

import Statistics from "../TypeFast/Statistics/Statistics"

import axios from "axios"
import { useState } from "react"

// TODO: stay on this page is user refreshes

function Results() {
	const [results, setResults] = useState([])

	useEffect(() => {
		axios
			.get(endpoints.Results)
			.then(({ data }) => setResults(data))
			.catch(() => {})
	})

	return (	
		<div>
			{results.map((results, i) => (
				<Statistics
					statistics={results.statistics}
					elapsed={results.seconds}
					textMode={results.textMode}
				/>
			))}
		</div>
	)
}

export default Results
