import React, { useState } from "react"

import { useAuthContext, AuthAction } from "context/auth"
import { endpoints } from "util/endpoints"

import Spinner from "react-bootstrap/Spinner"
import Button from "react-bootstrap/Button"
import Toast from "react-bootstrap/Toast"
import Modal from "react-bootstrap/Modal"

import axios from "axios"

import "./DeleteAccount.css"

function DeleteAccount({ show, setShow }) {
	const { setAuthState } = useAuthContext()

	const [waitingResponse, setWaitingResponse] = useState(false)

	const [toast, setToast] = useState({
		show: false,
		message: ""
	})

	const handleDeleteAccount = () => {
		setShow(false)
		setWaitingResponse(true)

		axios.delete(endpoints.DeleteAccount)
			.then(() => {
				// setWaitingResponse(false)
				setAuthState(AuthAction.DeleteAccount())
			})
			.catch(() => {
				setWaitingResponse(false)
				setToast({
					show: true,
					message: "Something went wrong. Please log back in and try again."
				})
			})
	}

	return (
		<>
			<Toast className="page-top"
				autohide delay={3500}
				show={toast.show} onClose={() => setToast({...toast, show: false})}
			>
				<Toast.Body>{toast.message}</Toast.Body>
			</Toast>

			{waitingResponse && (
				<div className="page-overlay">
					<Spinner animation="grow"></Spinner>
				</div>
			)}

			<Modal show={show} onHide={() => setShow(false)} id="delete-account">
				<Modal.Header closeButton>
					<Modal.Title>
						<i className="title-icon fa fa-exclamation-triangle"></i>
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
		</>
	)
}

export default DeleteAccount
