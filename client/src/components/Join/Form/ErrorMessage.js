import React from "react"

function ErrorMessage({ message, center = false }) {
	let centerStyle = ""
	if (center === true) centerStyle = "text-center mt-5"

	return (
		<div className={centerStyle}>
			<span className="text-danger" style={{ fontSize: "0.85rem" }}>
				{message}
			</span>
		</div>
	)
}

export default ErrorMessage
