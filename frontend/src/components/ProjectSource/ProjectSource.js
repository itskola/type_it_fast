import React from "react"

import { endpoints } from "../../util/endpoints"

import "./ProjectSource.css"

function ProjectSource() {
	return (
		<a href={endpoints.ProjectSource}>
			<i id="project-source" className="clickable-icon fab fa-github"></i>
		</a>
	)
}

export default ProjectSource