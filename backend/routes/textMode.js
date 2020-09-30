const router = require("express").Router()

const Sentence = require("../models/sentence")
const WordList = require("../models/wordList")

const Auth = require("../util/auth")
const Error = require("../util/error")

const Cache = {
	Sentence: {
		empty: true,
		value: [],
	},
	WordList: {
		empty: true,
		value: [],
	},
	Set: (cache, value) => {
		cache.empty = false
		cache.value = value
	},
}

router.use(Auth.verify)

router.get("/sentences", async (req, res) => {
	if (!Cache.Sentence.empty) 
		return res.status(200).send(Cache.Sentence.value)

	try {
		const docs = await Sentence.find({}).select("-_id")

		const sentences = []
		docs.forEach(doc => {
			sentences.push(doc.text)
		})

		Cache.Set(Cache.Sentence, sentences)
		return res.status(200).send(Cache.Sentence.value)
	} catch (err) {
		return res
			.status(500)
			.json(Error.CreateMessage(Error.Type.Db, Error.Message.Db))
	}
})

router.get("/words", async (req, res) => {
	if (!Cache.WordList.empty) 
		return res.status(200).send(Cache.WordList.value)

	try {
		const docs = await WordList.find({}).select("-_id")

		const words = []
		docs.forEach(doc => {
			doc.text.split(" ").forEach(word => {
				words.push(word)
			})
		})

		Cache.Set(Cache.WordList, words)
		return res.status(200).send(Cache.WordList.value)
	} catch (err) {
		return res
			.status(500)
			.json(Error.CreateMessage(Error.Type.Db, Error.Message.Db))
	}
})

module.exports = router
