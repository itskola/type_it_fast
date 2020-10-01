const router = require("express").Router()

const mongoose = require("mongoose")
const Result = require("../models/result")

const Auth = require("../util/auth")
const Error = require("../util/error")

router.use(Auth.verify)

router.route("/")
	.get(async (req, res) => {
		try {
			const results = await Result.find({
				userId: mongoose.Types.ObjectId(req.user.id),
			}, "statistics seconds textMode -_id")

			res.status(200).send(results)
		} catch (err) {
			res.status(500).json(
				Error.CreateMessage(Error.Type.Db, Error.Message.Db)
			)
		}
	})
	.post(async (req, res) => {
		try {
			const newResult = {
				userId: mongoose.Types.ObjectId(req.user.id),
				statistics: req.body.statistics,
				seconds: req.body.seconds,
				textMode: req.body.textMode,
			}

			const existingResults = await Result.find(
				{ userId: req.user.id },
				"updatedAt"
			).sort({ updatedAt: 1 })

			if (existingResults.length >= 5) {
				await Result.findByIdAndUpdate(existingResults[0]._id, newResult)
			} else {
				await new Result(newResult).save()
			}

			res.status(200).send("Result saved.")
		} catch (err) {
			res.status(500).json(
				Error.CreateMessage(Error.Type.Db, Error.Message.Db)
			)
		}
	})

module.exports = router
