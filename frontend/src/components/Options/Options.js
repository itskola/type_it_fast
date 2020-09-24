import React, { useState, useEffect } from "react"

import { useAuthContext, AuthAction } from "../../context/auth"
import { useTextModeContext, TextModeAction } from "../../context/textMode"
import { endpoints } from "../../util/endpoints"

import DeleteAccount from "./DeleteAccount/DeleteAccount"

import Dropdown from "react-bootstrap/Dropdown"

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

	// TODO: change color theme ...
	const handleThemeChange = () => {
		console.log("Change ColorTheme handler")
	}

	const handleTextModeStateChange = (action, mode) => {
		if (mode !== textModeState.mode) setTextModeState(action)
	}

	useEffect(() => {
		setTextModeState(TextModeAction.Set())
	}, [setTextModeState])

	const isSentencesMode = textModeState.mode === TextModeAction.Mode.Sentences
	const isWordsMode = textModeState.mode === TextModeAction.Mode.Words

	return (
		<div id="options">
			<Dropdown drop="right">
				<Dropdown.Toggle as={CustomToggle} 
					id="dropdown-options" className="strip-css-btn"
				>
					<i className="fa fa-cog"></i>
				</Dropdown.Toggle>

				<Dropdown.Menu>
					<Dropdown.Item className="option" onClick={handleThemeChange}>
						<span>Theme</span>
						<i className="fa fa-sun"></i>
					</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item className="option"
						onClick={() =>
							handleTextModeStateChange(
								TextModeAction.Sentences(), TextModeAction.Mode.Sentences
							)
						}
					>
						<span>Sentences</span>
						{isSentencesMode && <i className="fa fa-check"></i>}
					</Dropdown.Item>
					<Dropdown.Item className="option"
						onClick={() =>
							handleTextModeStateChange(
								TextModeAction.Words(), TextModeAction.Mode.Words
							)
						}
					>
						<span>Words</span>
						{isWordsMode && <i className="fa fa-check"></i>}
					</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item onClick={handleLogout}>
						Logout
					</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item onClick={() => setShowDeleteAccount(true)}>
						Delete account
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>

			<DeleteAccount show={showDeleteAccount} setShow={setShowDeleteAccount} />
		</div>
	)
}

export default Options
