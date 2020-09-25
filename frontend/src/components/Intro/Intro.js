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

const formTab = { Login: "login", Register: "register" }
const dLogin = { email: false, login: true, register: false }
const dRegister = { email: !dLogin.email, login: !dLogin.login, register: !dLogin.register }

function Intro() {
	const { setAuthState } = useAuthContext()

	const [loginErrors, setLoginErrors] = useState({})
	const [registerErrors, setRegisterErrors] = useState({})
	const [waitingResponse, setWaitingResponse] = useState(false)

	const loginResponse = data => {
		setWaitingResponse(false)
		setLoginErrors(data)
	}

	const registerResponse = data => {
		setWaitingResponse(false)
		setRegisterErrors(data)
	}

	const [toast, setToast] = useState({
		show: false,
		message: ""
	})

	const [activeTab, setActiveTab] = useState(formTab.Login)

	const handleLogin = form => {
		setWaitingResponse(true)
		
		axios.post(endpoints.Login, {
				username: form.username,
				password: form.password,
			})
			.then(({ data }) => {
				// loginResponse({})
				setAuthState(AuthAction.Login(data))
			})
			.catch(({ response: { data } }) => {
				loginResponse(data)
			})
	}

	const handleRegister = form => {
		setWaitingResponse(true)

		axios.post(endpoints.Register, {
				username: form.username,
				email: form.email,
				password: form.password,
			})
			.then(() => {
				registerResponse({})
				setActiveTab(formTab.Login)
				setToast({
					show: true,
					message: "Registration successful. You can now log in."
				})
			})
			.catch(({ response: { data } }) => {
				registerResponse(data)
			})
	}

	useEffect(() => {
		axios.get(endpoints.Login)
			.then(({ data }) => {
				setAuthState(AuthAction.Login(data))
			})
			.catch(() => {})
	}, [setAuthState])

	return (
		<div id="intro-outer-container">
			<Toast className="page-top"
				autohide delay={2000}
				show={toast.show} onClose={() => setToast({...toast, show:false})}
			>
				<Toast.Body>{toast.message}</Toast.Body>
			</Toast>

			{waitingResponse && (
				<div className="page-top">
			 		<Spinner animation="grow"></Spinner>
				</div>
			)}

			{AuthAction.LocalAuth() ? (
				<Spinner animation="border" role="status">
					<span className="sr-only">Loading...</span>
				</Spinner>
			) : (
				<div id="intro-inner-container">
					<Title />

					<Tabs activeKey={activeTab} onSelect={setActiveTab}>
						<Tab eventKey={formTab.Login} title="Login">
							<Form id="login" display={dLogin} disabled={waitingResponse}
								onLogin={handleLogin}
								errors={loginErrors}
							/>
						</Tab>
						<Tab eventKey={formTab.Register} title="Register">
							<Form id="register" display={dRegister} disabled={waitingResponse}
								onRegister={handleRegister}
								errors={registerErrors}
							/>
						</Tab>
					</Tabs>
				</div>
			)}
		</div>
	)
}

export default Intro
