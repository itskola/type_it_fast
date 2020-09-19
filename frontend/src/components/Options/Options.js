import React from "react"

import { useAuthContext, AuthAction } from "../../context/auth"
import { endpoints } from "../../util/endpoints"

import Dropdown from "react-bootstrap/Dropdown"

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

	const handleLogout = () => {
		axios.delete(endpoints.Logout)
			.then(({ data }) => {
				console.log(data)
				setAuthState(AuthAction.Logout())
			})
			.catch(() => {
				// TODO: create popup instead of logging
				console.log("error while logging out. please try again")
			})
	}

	const handleDeleteAccount = () => {
		console.log("Delete Account")
	}

	return (
		<div id="options">
			<Dropdown>
				<Dropdown.Toggle as={CustomToggle}
					id="dropdown-options"
					>
					<i className="fa fa-cog"></i>
				</Dropdown.Toggle>

				<Dropdown.Menu>
					<Dropdown.Item>Mode</Dropdown.Item>
					<Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
					<Dropdown.Item onClick={handleDeleteAccount}>Delete account</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</div>
	)
}

export default Options
