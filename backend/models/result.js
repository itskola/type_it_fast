const mongoose = require("mongoose")

const resultSchema = new mongoose.Schema(
	{
		userId: { type: mongoose.Types.ObjectId, required: true },
		statistics: {
			characters: {
				correct: { type: Number, required: true },
				incorrect: { type: Number, required: true },
			},
			words: {
				correct: { type: Number, required: true },
				incorrect: { type: Number, required: true },
			},
		},
		seconds: { type: Number, required: true },
		textMode: { type: String, required: true },
	},
	{ timestamps: { createdAt: false, updatedAt: true } }
)

module.exports = mongoose.model("Result", resultSchema)
