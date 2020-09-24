const router = require("express").Router()

const { User } = require("../models/user")

const Auth = require("../util/auth")
const Error = require("../util/error")
const Hash = require("../util/hash")

router.route("/")
	.get(Auth.verify, (req, res) => {
		res.status(200).send(req.decoded)
	})
	.post(async (req, res) => {
		try {
			let user = await User.findOne({ username: req.body.username })
			if (user) {
				if (!(await Hash.compare(req.body.password, user.password))) {
					user = null
				}
			}

			if (!user) {
				return res
					.status(409)
					.json(Error.CreateMessage(Error.Type.Login, Error.Message.Login))
			}

			user = { id: user._id, username: user.username }
			res.cookie(Auth.Name, Auth.sign(user), {
				httpOnly: true, sameSite: "strict",
			})
			res.status(200).json(user)
		} catch (err) {
			res.status(400).json(
				Error.CreateMessage(Error.Type.Db, Error.Message.Db)
			)
		}
	})
	.delete(Auth.verify, (req, res) => {
		res.cookie(Auth.Name, "", { maxAge: 0 })
		res.status(200).send("")
	})

module.exports = router
