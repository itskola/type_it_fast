const router = require('express').Router()

const jwt = require("jsonwebtoken")

const { User, exists: existingUser, validate: validateUser } = require("../models/user")
const Error = require("../util/error")

const Token = "token"

router.route("/")
	.post(async (req, res) => {
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
	.delete( (req, res) => {
		// get user from jwt, delete it in db
		res.cookie(Token, "", { maxAge: 0 })
		res.status(200).send("deleted account")
	})

module.exports = router