class Error {
	static Type = {
		Unauthorized: "unauthorized",
		Forbidden: "forbidden",
		Login: "login",
		Form: "form",
		Db: "db"
	}

	static Message = {
		Unauthorized: "Access denied. Please log in and try again.",
		Forbidden: "Unable to verify token (invalid token).",
		Register: "Registration failed. Please check all fields and try again.",
		Login: "Incorrect login credentials.",
		Db: "Database error. Please try again later."
	}

	static CreateMessage = (type, payload) => ({ type, payload })
}

module.exports = Error