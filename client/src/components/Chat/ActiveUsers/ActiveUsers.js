import React from "react"

import ActiveUser from "./ActiveUser"

import "./ActiveUsers.css"

function ActiveUsers({ users }) {
	return (
		<div className="users scrollbar-hidden">
			<div className="users-total">
				<span>Total</span>
				<span className="total">{users.length}</span>
			</div>
			<div className="user-container">
				{users.map((user, i) => (
					<ActiveUser key={i} user={user} />
				))}
			</div>
		</div>
	)
}

export default ActiveUsers
// export default React.memo(ActiveUsers)
