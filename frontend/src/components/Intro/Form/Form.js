import React, { useState, useRef } from "react"

import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

import InputGroup from "./InputGroup"
import ErrorMessage from "./ErrorMessage"

const _form = {
	username: "username",
	email: "email",
	password: "password"
}

// TODO: add password recovery
	/* <Button variant="link" className="p-0 mt-1">Forgot your password?</Button> */
	// some id's are not unique
function _Form({ id, display, onLogin, onRegister, errors={} }) {
	const [form, setForm] = useState({
		username: "",
		email: "",
		password: ""
	})

	const [clientErrors, setClientErrors] = useState("")

	const inputs = {
        username: useRef(),
        email: useRef(),
        password: useRef()
	}

	let formErrors = {}
	let otherErrors = ""
	if (clientErrors === "") {
		if (errors.type === "form") formErrors = errors.payload
		else otherErrors = errors.payload
	}

	const validate = () => {
		let isValid = true

        if (form.username === "") {
            inputs.username.current.focus(); isValid = false
		} else if (display.email && form.email === "") {
			inputs.email.current.focus(); isValid = false
		} else if (form.password === "") {
            inputs.password.current.focus(); isValid = false
		}

		if (isValid) setClientErrors("")
		else setClientErrors("All fields are required. Please fill them in.")

        return isValid
	}

	const handleChange = ({ target }) => {
		setForm({
			...form,
			[target.name]: target.value
		})
	}

	const handleLogin = e => {
		e.preventDefault()
		if (validate()) onLogin(form)
	}

	const handleRegister = e => {
		e.preventDefault()
		if (validate()) onRegister(form)
	}

	return (
		<Form>
			<InputGroup ref={inputs.username} id={id}
				type="text" placeholder="username" name={_form.username}
				error={formErrors[_form.username]}
				onChange={handleChange}
			/>

			{display.email && (
				<OverlayTrigger placement="right"
					overlay={
						<Tooltip id="tooltip">
							Your email is only used for password recovery.
						</Tooltip>
					}
				>
					<InputGroup ref={inputs.email} id={id}
						type="email" placeholder="email" name={_form.email}
						error={formErrors[_form.email]}
						onChange={handleChange}
					/>
				</OverlayTrigger>
			)}

			<InputGroup ref={inputs.password} id={id}
				type="password" placeholder="password" name={_form.password}
				onChange={handleChange}
			/>

			{display.login && (
				<Button variant="primary" type="submit" 
					className="text-uppercase w-100 py-3"
					onClick={handleLogin}
				>
					Login
				</Button>
			)}

			{display.register && (
				<Button variant="success" type="submit"
					className="text-uppercase w-100 py-3"
					onClick={handleRegister}
				>
					Register
				</Button>
			)}

			{clientErrors && <ErrorMessage message={clientErrors} center={true} />}
			{otherErrors && <ErrorMessage message={otherErrors} center={true} /> }
		</Form>
	)
}

export default _Form
