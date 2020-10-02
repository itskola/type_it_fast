import React, { useState, useEffect } from "react"
import { useAuthContext } from "context/auth"

import ActiveUsers from "./ActiveUsers/ActiveUsers"
import Messages from "./Messages/Messages"
import Input from "./Input/Input"

import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"

import io from "socket.io-client"

import "./Chat.css"

let socket

function Chat() {
	const { authState } = useAuthContext()

	const [messages, setMessages] = useState([])
	const [users, setUsers] = useState([])

	useEffect(() => {
		socket = io()

		socket.emit("join", { username: authState.username })
		socket.on("users", ({ connectedUsers }) => {
			setUsers(connectedUsers)
		})

		socket.on("message", newMessage => {
			setMessages(messages => [...messages, newMessage])
		})

		return () => {
			socket.disconnect()
		}
	}, [authState.username])

	const sendMessage = ({ target: { value } }) => {
		if (value.trim().length === 0) return

		const message = { sender: authState.username, text: value }
		setMessages([...messages, message])
		socket.emit("message", message)

		return true
	}

	return (
		<div id="chat-outer-container">
			<div id="chat-inner-container">
				<Tabs defaultActiveKey="chat">
					<Tab eventKey="chat" title="Chat">
						<Messages messages={messages} user={authState.username} />
						<Input onClick={sendMessage} />
					</Tab>
					<Tab eventKey="active-users" title="Active Users">
						<ActiveUsers users={users} />
					</Tab>
				</Tabs>
			</div>
		</div>
	)
}

export default Chat
