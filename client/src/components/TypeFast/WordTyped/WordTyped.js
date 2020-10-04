import React from "react"

import "./WordTyped.css"

function WordTyped({ value, onChange, disabled }, ref) {
	return (
		<div>
			<input ref={ref}
				type="text"
				id="word-typed"
				className="strip-css-input"
				disabled={disabled}
				value={value} onChange={onChange}
				onPaste={e => e.preventDefault()}
			/>
		</div>
	)
}

export default React.forwardRef(WordTyped)
