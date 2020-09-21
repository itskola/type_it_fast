import React, { useState, useEffect } from "react"

import { useAuthContext, AuthAction } from "../../context/auth"
import { endpoints } from "../../util/endpoints"

import Spinner from "react-bootstrap/Spinner"
import Toast from "react-bootstrap/Toast"
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"

import Title from "../Title/Title"
import Form from "./Form/Form"

import axios from "axios"

import "./Intro.css"

function Intro() {
	const { setAuthState } = useAuthContext()

	const [loginErrors, setLoginErrors] = useState({})
	const [registerErrors, setRegisterErrors] = useState({})

	const [showToast, setShowToast] = useState(false)
	const [toastMsg, setToastMsg] = useState("")
	const createToast = msg => {
		setToastMsg(msg)
		setShowToast(true)
	}

	const formTabs = { Login: "login", Register: "register" }
	const [activeTab, setActiveTab] = useState(formTabs.Login)

	const dLogin = { email: false, login: true, register: false }
	const dRegister = { email: !dLogin.email, login: !dLogin.login, register: !dLogin.register }

	const handleLogin = form => {
		axios.post(endpoints.Login, {
				username: form.username,
				password: form.password,
			})
			.then(({ data }) => {
				setAuthState(AuthAction.Login(data))
				// setLoginErrors({})
					// unecessary and would have to check if Intro is still mounted
			})
			.catch(({ response: { data } }) => setLoginErrors(data))
	}

	const handleRegister = form => {
		axios.post(endpoints.Register, {
				username: form.username,
				email: form.email,
				password: form.password,
			})
			.then(() => {
				setActiveTab(formTabs.Login)
				setRegisterErrors({})
				createToast("Registration successful. You can now log in.")
			})
			.catch(({ response: { data } }) => setRegisterErrors(data))
	}

	// FIXME: if server is offline, app wil continuously load
	useEffect(() => {
		axios.get(endpoints.Login)
			.then(({ data }) => {
				if (data) setAuthState(AuthAction.Login(data))
			})
			.catch(() => {})
	}, [setAuthState])

	return (
		<div className="join-outer-container">
			{AuthAction.LocalAuth() ? (
				<Spinner animation="border" role="status">
					<span className="sr-only">Loading...</span>
				</Spinner>
			) : (
				<div className="join-inner-container">
					<Toast autohide
						className="toast-top"
						show={showToast}
						delay={20000}
						onClose={() => setShowToast(false)}
					>
						<Toast.Body>{toastMsg}</Toast.Body>
					</Toast>

					<Title className="title" />

					<Tabs activeKey={activeTab} onSelect={setActiveTab}>
						<Tab eventKey={formTabs.Login} title="Login">
							<Form display={dLogin} id="login"
								errors={loginErrors}
								onLogin={handleLogin}
							/>
						</Tab>
						<Tab eventKey={formTabs.Register} title="Register">
							<Form display={dRegister} id="register"
								errors={registerErrors}
								onRegister={handleRegister}
							/>
						</Tab>
					</Tabs>
				</div>
			)}
		</div>
	)
}

export default Intro
