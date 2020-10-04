import React from "react"

function ActiveUser({ user }) {
	return (
		<div className="user">
			<span className="username">{user}</span>
			<i className="fa fa-circle user-online"></i>
		</div>
	)
}

export default ActiveUser
