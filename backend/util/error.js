class Error {
	static Type = {
		Login: "login",
		Form: "form",
		Db: "db"
	}

	static Message = {
		Db: "Database error. Please try again later.",
		Login: "Incorrect login credentials.",
		Register: "Registration failed. Please check all fields and try again."
	}

	static CreateMessage = (type, payload) => ({ type, payload })
}

module.exports = Error