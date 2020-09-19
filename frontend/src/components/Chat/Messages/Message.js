import React from "react"

function Message({ message, user }) {
	let isSentByThisUser = false
	if (user === message.sender) isSentByThisUser = true

	return (
		<div className={
				isSentByThisUser
                    ? "message-container message-container-right"
					: "message-container"
			}
		>
			<div className="message-sender">{message.sender}</div>
			<div className="message-text">{message.text}</div>
		</div>
	)
}

export default Message
