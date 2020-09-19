import React from "react"

import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import ErrorMessage from "./ErrorMessage"

// TODO: put parent & child styling into css file
function _InputGroup({ id="", className="", type, name, placeholder, onChange, error, ...rest }, ref) {
    let icon = null
	switch (type) {
		case "text"    : icon = "fa-user"    ; break
		case "email"   : icon = "fa-envelope"; break
		case "password": icon = "fa-lock"    ; break
		default: break
	}
	
	const forID = `${type}-${id}`

	const parent = { backgroundColor: "var(--bg-main)" }
	const child = { color: "var(--txt-main-dark" }

	return (
		<div className="my-3">
			<InputGroup className={`rounded p-1 ${className}`} style={parent}
				{...rest}
			>
				<InputGroup.Prepend>
					<InputGroup.Text 
						className="border-0 bg-transparent" style={child}
					>
						<label className="p-0 m-0" htmlFor={forID}>
							<i className={`fa ${icon}`} style={{ width:"16px" }}></i>	
						</label>
					</InputGroup.Text>
				</InputGroup.Prepend>
				<FormControl ref={ref} id={forID} 
					className="border-0 shadow-none py-4 bg-transparent" style={child}
					type={type} placeholder={placeholder} name={name}
					onChange={onChange}
				/>
			</InputGroup>
			{error && <ErrorMessage message={error} />}
		</div>
	)
}

export default React.forwardRef(_InputGroup)
