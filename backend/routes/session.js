const router = require('express').Router()

const jwt = require("jsonwebtoken")

const { User, exists: existingUser, validate: validateUser } = require("../models/user")
const Error = require("../util/error")

const Token = "token"

router.route("/login")
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
		// if (req.cookies) console.log(req.cookies)
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
		res.status(200).json("logged out")
	})

router.post("/register", async (req, res) => {
	const { hasErrors, errors } = validateUser(req.body)
	if (hasErrors) {
		return res.status(409).json(Error.CreateMessage(
			Error.Type.Form, errors
		))
	}

	try {
		const { hasErrors, errors } = await existingUser(req.body)
		if (hasErrors) {
			return res.status(409).json(Error.CreateMessage(
				Error.Type.Form, errors
			))
		}
		
		await (new User(req.body)).save()
		res.status(200).send(`User ${req.body.username} created.`)
	} catch (error) {
		res.status(500).json(Error.CreateMessage(
			Error.Type.Db, Error.Message.Db
		))
	}
})

module.exports = router