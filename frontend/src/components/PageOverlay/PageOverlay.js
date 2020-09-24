import React from 'react'

import "./PageOverlay.css"

function PageOverlay(props) {
	return (
		<div className="page-overlay">
			{props.children}
		</div>
	)
}

export default PageOverlay
