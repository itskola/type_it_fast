import React, { useState, useEffect } from "react"

import { useAuthContext, AuthAction } from "context/auth"
import { useTextModeContext, TextModeAction } from "context/textMode"
import { endpoints } from "util/endpoints"

import DeleteAccount from "./DeleteAccount/DeleteAccount"

import Dropdown from "react-bootstrap/Dropdown"
import Spinner from "react-bootstrap/Spinner"

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

	const [waitingResponse, setWaitingResponse] = useState(false)

	const handleLogout = async () => {
		setWaitingResponse(true)

		try {
			await axios.delete(endpoints.Logout)
		} catch (e) {
		} finally {
			setWaitingResponse(false)
			setAuthState(AuthAction.Logout())
		}
	}

	// TODO: implement changing of dark and light themes
	// const handleThemeChange = () => {
	// 	console.log("Change ColorTheme handler")
	// }

	const handleTextModeStateChange = (action, mode) => {
		if (mode !== textModeState.mode) setTextModeState(action)
	}

	useEffect(() => {
		setTextModeState(TextModeAction.Set())
	}, [setTextModeState])

	const isSentencesMode = textModeState.mode === TextModeAction.Mode.Sentences
	const isWordsMode = textModeState.mode === TextModeAction.Mode.Words

	return (
		<>
			{waitingResponse && (
				<div className="page-overlay">
					<Spinner animation="grow"></Spinner>
				</div>
			)}
			
			<Dropdown id="options" drop="right">
				<Dropdown.Toggle as={CustomToggle} 
					id="options-toggle" className="strip-css-btn clickable-icon"
				>
					<i id="clickable-icon" className="fa fa-cog"></i>
				</Dropdown.Toggle>

				<Dropdown.Menu>
					<Dropdown.Item className="option option-disabled">
						<span>Theme</span>
						<i className="theme fa fa-sun"></i>
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
						{isSentencesMode && <i className="checked fa fa-check"></i>}
					</Dropdown.Item>
					<Dropdown.Item className="option"
						onClick={() =>
							handleTextModeStateChange(
								TextModeAction.Words(), TextModeAction.Mode.Words
							)
						}
					>
						<span>Words</span>
						{isWordsMode && <i className="checked fa fa-check"></i>}
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
		</>
	)
}

export default Options
