const router = require("express").Router()

const Auth = require("../util/auth")
const Error = require("../util/error")

const { User, exists: existingUser, validate: validateUser } = require("../models/user")

router.route("/")
	.post(async (req, res) => {
		const { hasErrors, errors } = validateUser(req.body)
		if (hasErrors) {
			return res.status(409).json(Error.CreateMessage(Error.Type.Form, errors))
		}

		try {
			const { hasErrors, errors } = await existingUser(req.body)
			if (hasErrors) {
				return res
					.status(409)
					.json(Error.CreateMessage(Error.Type.Form, errors))
			}

			await new User(req.body).save()
			res.status(200).send(`User ${req.body.username} created.`)
		} catch (err) {
			res.status(500).json(
				Error.CreateMessage(Error.Type.Db, Error.Message.Db)
			)
		}
	})
	.delete(Auth.verify, (req, res) => {
		User.deleteOne({ username: req.decoded.username }, err => {
			if (err) {
				return res
					.status(500)
					.json(Error.CreateMessage(Error.Type.Db, Error.Message.Db))
			}

			res.cookie(Auth.Name, "", { maxAge: 0 })
			res.status(200).send("")
		})
	})

module.exports = router
