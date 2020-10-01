const jwt = require("jsonwebtoken")

const Error = require("./error")

class Auth {
	static Name = "auth"

	static verify = (req, res, next) => {
		const token = req.cookies[Auth.Name]
		if (!token) {
			return res
				.status(401)
				.json(
					Error.CreateMessage(
						Error.Type.Unauthorized,
						Error.Message.Unauthorized
					)
				)
		}

		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) {
				return res
					.status(401)
					.json(
						Error.CreateMessage(
							Error.Type.Forbidden,
							Error.Message.Forbidden
						)
					)
			}

			req.user = decoded
			next()
		})
	}

	static sign = payload => jwt.sign(payload, process.env.JWT_SECRET)
}

module.exports = Auth
