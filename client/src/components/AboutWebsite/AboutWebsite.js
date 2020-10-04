import React from "react"

import Info from "./Info/Info"
import ProjectSource from "./ProjectSource/ProjectSource"

import "./AboutWebsite.css"

function AboutWebsite() {
	return (
		<div id="about-website">
			<Info />
			<div className="spacer"></div>
			<ProjectSource />
		</div>
	)
}

export default AboutWebsite
