import React from "react"

import { endpoints } from "util/endpoints"

export default function Updates() {
	return (
		<section className="info-section">
			<a
				href={endpoints.ProjectSource}
				target="_blank"
				rel="noopener noreferrer"
			>
				GitHub page
			</a>
		</section>
	)
}
