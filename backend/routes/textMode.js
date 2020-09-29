const router = require("express").Router()

const Sentence = require("../models/sentence")
const WordList = require("../models/wordList")

const Auth = require("../util/auth")
const Error = require("../util/error")

const Cache = {
	Sentence: {
		empty: true, value: "",
	},
	WordList: {
		empty: true, value: "",
	},
	Set: (cache, value) => {
		cache.empty = false
		cache.value = value
	},
}

const textModeEntriesToString = (Collection, cache) =>
	new Promise(async (resolve, reject) => {
		if (!cache.empty) 
			return resolve(cache.value)

		try {
			const docs = await Collection.find({}).select("-_id")

			let text = ""
			for (let i = 0; i < docs.length - 1; ++i) text += docs[i].text + " "
			text += docs[docs.length - 1].text

			Cache.Set(cache, text)

			resolve(cache.value)
		} catch (err) {
			reject(err)
		}
	})

router.use(Auth.verify)

router.get("/sentences", (req, res) => {
	textModeEntriesToString(Sentence, Cache.Sentence)
		.then(text => {
			return res.status(200).send(text)
		})
		.catch(err => {
			return res
				.status(500)
				.json(Error.CreateMessage(Error.Type.Db, Error.Message.Db))
		})
})

router.get("/words", (req, res) => {
	textModeEntriesToString(WordList, Cache.WordList)
		.then(text => {
			return res.status(200).send(text)
		})
		.catch(err => {
			return res
				.status(500)
				.json(Error.CreateMessage(Error.Type.Db, Error.Message.Db))
		})
})

module.exports = router
