import React from "react"

import Message from "./Message"

import "./Messages.css"

function Messages({ messages, user }) {
    return (
        <div className="messages scrollbar-hidden">
            {messages.map((msg, i) =>
                <Message key={i} message={msg} user={user} />
            )}
        </div>
    )
}

export default Messages
