import React, { useState } from "react"

import { useAuthContext, AuthAction } from "../../context/auth"
import { endpoints } from "../../util/endpoints"

import Dropdown from "react-bootstrap/Dropdown"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

import axios from "axios"

import "./Options.css"

const CustomToggle = React.forwardRef(({ onClick, children, ...rest }, ref) => (
	<button ref={ref}
		onClick={e => { e.preventDefault(); onClick(e) }}
		{...rest}
	>
		{children}
	</button>
))

function Options() {
	const { setAuthState } = useAuthContext()

	const [showDeleteAccount, setShowDeleteAccount] = useState(false);

	const handleLogout = () => {
		axios.delete(endpoints.Logout)
			.then(() => setAuthState(AuthAction.Logout()))
			.catch(() => {
				// TODO: create popup instead of logging
				console.log("error while logging out. please try again")
			})
	}

	const handleDeleteAccount = (e) => {
		axios.delete(endpoints.DeleteAccount)
			.then(() => setAuthState(AuthAction.DeleteAccount()))
			.catch(() => {
				// TODO: create popup instead of logging
				console.log("error while deleting account. please try again")
			})
	}

	return (
		<div id="options">
			<Dropdown drop="right">
				<Dropdown.Toggle as={CustomToggle}
					id="dropdown-options"
				>
					<i className="fa fa-cog"></i>
				</Dropdown.Toggle>

				<Dropdown.Menu>
					<Dropdown.Item>Mode</Dropdown.Item>
					<Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
					<Dropdown.Item onClick={() => setShowDeleteAccount(true)}>Delete account</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>

			<Modal show={showDeleteAccount} onHide={() => setShowDeleteAccount(false)}>
				<Modal.Header closeButton>
					<Modal.Title>
						<i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
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
