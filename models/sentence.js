const mongoose = require("mongoose")

const sentenceSchema = new mongoose.Schema({
	text: { type: String, required: true },
})

module.exports = mongoose.model("Sentence", sentenceSchema)
