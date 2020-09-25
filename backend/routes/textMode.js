const router = require("express").Router()

const Sentence = require("../models/sentence")
const WordList = require("../models/wordList")

const Auth = require("../util/auth")
const Error = require("../util/error")

router.use(Auth.verify)

router.get("/sentence", async (req, res) => {
	// Model.aggregate([{ $sample: { size: 1 } }])

	Sentence.countDocuments().exec((err, count) => {
		var r = Math.floor(Math.random() * count)
		Sentence.findOne()
			.skip(r)
			.exec((err, result) => {
				if (err) {
					return res
						.send(500)
						.json(Error.CreateMessage(Error.Type.Db, Error.Message.Db))
				}
				res.status(200).send(result.text)
			})
	})
})

router.get("/words", async (req, res) => {
	// get multiple db entries ann concatenate them

	WordList.countDocuments().exec((err, count) => {
		var r = Math.floor(Math.random() * count)
		WordList.findOne()
			.skip(r)
			.exec((err, result) => {
				if (err) {
					return res
						.send(500)
						.json(Error.CreateMessage(Error.Type.Db, Error.Message.Db))
				}
				res.status(200).send(result.text)
			})
	})
})

module.exports = router
