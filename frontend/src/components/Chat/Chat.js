import React, { useState, useEffect } from "react"
import { useAuthContext } from "../../context/auth"

import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"

import Messages from "./Messages/Messages"
import Input from "./Input/Input"
import ActiveUsers from "./ActiveUsers/ActiveUsers"

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
			setUsers(users => connectedUsers)
		})

		socket.on("message", newMessage => {
			setMessages(messages => [...messages, newMessage])
		})

		// socket.on("disconnect")
	}, [authState.username])

	const sendMessage = ({ target: { value } }) => {
		if (value.trim().length === 0) return

		const newMessage = { sender: authState.username, text: value }
		setMessages([...messages, newMessage])
		socket.emit("message", newMessage)

		return true
	}

	return (
		<div id="chat-container">
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
	)
}

export default Chat
