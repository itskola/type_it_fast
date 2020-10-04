import React from "react"

import { endpoints } from "util/endpoints"

export default function About() {
	return (
		<section className="info-section">
			<h4 className="title">About Type it Fast</h4>
			<p className="paragraph">
				Type it Fast is a minimalistic website for measuring typing speed.
			</p>
			<p className="paragraph">
				Apart from taking actual speed required to type words, it also takes
				into account mistakes (that you didn't correct) made along the way.
			</p>
			<p className="paragraph">
				So it measures <span>how fast</span>, and <span>how correct</span>{" "}
				you are.
			</p>
			<br />
			<h4 className="title">Future plans</h4>
			<p className="paragraph">
				Base of site is set. In the future I plan to add online mode (hence
				the chat), but in the meantime feel free to pratice your typing
				skills.
			</p>
			<p className="paragraph">
				You can visit{" "}
				<a
					href={endpoints.ProjectSource}
					target="_blank"
					rel="noopener noreferrer"
				>
					GitHub page
				</a>{" "}
				to find out more about future plans and releases.
			</p>
		</section>
	)
}
