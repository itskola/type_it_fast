const router = require('express').Router()

const jwt = require("jsonwebtoken")

const { User, exists: existingUser, validate: validateUser } = require("../models/user")
const Error = require("../util/error")

const Token = "token"

router.route("/")
	.get((req, res) => {
		if (req.cookies[Token]) {
			jwt.verify(req.cookies[Token], process.env.JWT_SECRET, 
				(err, decoded) => {
					if (err) return res.status(401)
					res.status(200).json(decoded)
				}
			)
		} else {
			res.status(200).send("")
		}
	})
	.post(async (req, res) => {
		try {
			let user = await User.findOne({ username: req.body.username, password: req.body.password }).select("-password")
			if (!user)
				return res.status(409).json(Error.CreateMessage(
					Error.Type.Login, Error.Message.Login
				))

			user = { id: user._id, username: user.username }
			const token = jwt.sign(user, process.env.JWT_SECRET)
			
			res.cookie(Token, token, { httpOnly: true, sameSite: "strict" })
			res.status(200).json(user)
		} catch (error) {
			res.status(500).json(Error.CreateMessage(
				Error.Type.Db, Error.Message.Db
			))
		}
	})
	.delete((req, res) => {
		res.cookie(Token, "", { maxAge: 0 })
		res.status(200).send("")
	})

module.exports = router