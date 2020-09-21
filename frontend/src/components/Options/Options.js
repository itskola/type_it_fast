import React, { useState } from "react"

import { useAuthContext, AuthAction } from "../../context/auth"
import { useTextModeContext, TextModeAction } from "../../context/textMode"
import { endpoints } from "../../util/endpoints"

import Dropdown from "react-bootstrap/Dropdown"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"

import axios from "axios"

import "./Options.css"

const CustomToggle = React.forwardRef(({ onClick, children, ...rest }, ref) => (
	<button ref={ref}
		onClick={e => {
			e.preventDefault()
			onClick(e)
		}}
		{...rest}
	>
		{children}
	</button>
))

function Options() {
	const { setAuthState } = useAuthContext()
	const { textModeState, setTextModeState } = useTextModeContext()

	const [showDeleteAccount, setShowDeleteAccount] = useState(false)

	const handleLogout = () => {
		axios.delete(endpoints.Logout)
			.then(() => setAuthState(AuthAction.Logout()))
			.catch(() => {})
	}

	const handleDeleteAccount = () => {
		axios.delete(endpoints.DeleteAccount)
			.then(() => setAuthState(AuthAction.DeleteAccount()))
			.catch(() => {})
	}

	// TODO: change color theme ...
	const handleThemeChange = () => {
		console.log("Color Theme handler")
	}

	const handleTextModeStateChange = (action, mode) => {
		if (mode !== textModeState.mode) setTextModeState(action)
	}

	const isSentencesMode = textModeState.mode === TextModeAction.Modes.Sentences
	const isWordsMode = textModeState.mode === TextModeAction.Modes.Words

	return (
		<div id="options">
			<Dropdown drop="right">
				<Dropdown.Toggle as={CustomToggle} id="dropdown-options">
					<i className="fa fa-cog"></i>
				</Dropdown.Toggle>

				<Dropdown.Menu>
					<Dropdown.Item className="option" onClick={handleThemeChange}>
						<span>Theme</span>
						<i className="fa fa-lightbulb"></i>
					</Dropdown.Item>
					<Dropdown.Divider className="mx-2" />
					<Dropdown.Item className="option"
						onClick={() =>
							handleTextModeStateChange(
								TextModeAction.Sentences(), TextModeAction.Modes.Sentences
							)
						}
					>
						<span>Sentences</span>
						{isSentencesMode && <i className="fa fa-check"></i>}
					</Dropdown.Item>
					<Dropdown.Item className="option"
						onClick={() =>
							handleTextModeStateChange(
								TextModeAction.Words(), TextModeAction.Modes.Words
							)
						}
					>
						<span>Words</span>
						{isWordsMode && <i className="fa fa-check"></i>}
					</Dropdown.Item>
					<Dropdown.Divider className="mx-2" />
					<Dropdown.Item onClick={handleLogout}>
						Logout
					</Dropdown.Item>
					<Dropdown.Divider className="mx-2" />
					<Dropdown.Item onClick={() => setShowDeleteAccount(true)}>
						Delete account
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>

			<Modal show={showDeleteAccount}
				onHide={() => setShowDeleteAccount(false)}
			>
				<Modal.Header closeButton>
					<Modal.Title>
						<i className="fa fa-exclamation-triangle"></i>
						Delete account?
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Click on "Delete" button to confirm that you want to delete your account.
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={handleDeleteAccount}>
						Delete
					</Button>
					<Button variant="secondary" onClick={() => setShowDeleteAccount(false)}>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default Options
