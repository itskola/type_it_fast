import React from "react"

import { useAuthContext, AuthAction } from "../../../context/auth"
import { endpoints } from "../../../util/endpoints"

import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"

import axios from "axios"

import "./DeleteAccount.css"

function DeleteAccount({ show, setShow }) {
	const { setAuthState } = useAuthContext()

	const handleDeleteAccount = () => {
		axios.delete(endpoints.DeleteAccount)
			.then(() => setAuthState(AuthAction.DeleteAccount()))
			.catch(() => {})
	}

	return (
		<Modal show={show} onHide={() => setShow(false)}>
			<Modal.Header closeButton>
				<Modal.Title>
					<i className="fa fa-exclamation-triangle"></i>
					Delete account?
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				Click on "Delete" button to confirm that you want to delete your
				account.
			</Modal.Body>
			<Modal.Footer>
				<Button variant="danger" onClick={handleDeleteAccount}>
					Delete
				</Button>
				<Button variant="secondary" onClick={() => setShow(false)}>
					Cancel
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default DeleteAccount
