import React, { useState } from "react"

import About from "./Sections/About"
import Calculations from "./Sections/Calculations"
import Updates from "./Sections/Updates"

import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"

import "./Info.css"
import "./Sections/Sections.css"

function Info() {
	const [showAbout, setShowAbout] = useState(false)

	const tabStyle = { height: "calc(100vh - 250px)", overflowY: "auto" }

	return (
		<>
			<button
				id="info-btn"
				className="strip-css-btn"
				title="Info"
				onClick={() => setShowAbout(true)}
			>
				<i className="fa fa-info-circle clickable-icon"></i>
			</button>

			<Modal
				id="info-container"
				size="lg"
				show={showAbout}
				onHide={() => setShowAbout(false)}
			>
				<Modal.Body>
					<Tabs defaultActiveKey="about">
						<Tab eventKey="about" title="About" style={tabStyle}>
							<About />
						</Tab>
						<Tab
							eventKey="calculations"
							title="Calculations"
							style={tabStyle}
						>
							<Calculations />
						</Tab>
						<Tab eventKey="updates" title="Updates" style={tabStyle}>
							<Updates />
						</Tab>
					</Tabs>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowAbout(false)}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default Info
