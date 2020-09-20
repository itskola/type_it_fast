const mongoose = require("mongoose")

const wordListSchema = new mongoose.Schema({
	text: { type: String, required: true },
})

module.exports = mongoose.model("WordList", wordListSchema)
