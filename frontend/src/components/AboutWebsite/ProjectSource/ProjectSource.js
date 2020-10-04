import React from "react"

import { endpoints } from "util/endpoints"

function ProjectSource() {
	return (
		<a id="project-source" href={endpoints.ProjectSource} target="_blank" rel="noopener noreferrer">
			<i className="clickable-icon fab fa-github"></i>
		</a>
	)
}

export default ProjectSource
