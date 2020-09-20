const router = require("express").Router()

const Auth = require("../util/auth")

const Sentence = require("../models/sentence")
const WordList = require("../models/wordList")

router.use(Auth.verify)

router.get("/sentence", async (req, res) => {
	// Model.aggregate([{ $sample: { size: 1 } }])

	// let date
	// for (let i = 0; i < 5e6; ++i) date = new Date()
	// console.log(date)

	Sentence.countDocuments().exec((err, count) => {
		var r = Math.floor(Math.random() * count)
		Sentence.findOne()
			.skip(r)
			.exec((err, result) => {
				if (err) return res.send(500).send("-")
				// create error msg object
				res.status(200).send(result.text)
			})
	})
})

router.get("/words", async (req, res) => {})

module.exports = router
