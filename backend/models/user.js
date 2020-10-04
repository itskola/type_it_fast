const mongoose = require("mongoose")
const Result = require("./result")

const Joi = require("joi")
const Hash = require("../util/hash")

const User = mongoose.model(
	"User",
	new mongoose.Schema({
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
	})
		.pre("save", function (next) {
			Hash.generate(this.password)
				.then(hash => {
					this.password = hash
					next()
				})
				.catch(err => next(err))
		})
		.pre("deleteOne", { query: true }, function (next) {
			const userId = this.getFilter()["_id"]
			Result.deleteMany({ userId })
				.then(res => {
					next()
				})
				.catch(err => {
					next(err)
				})
		})
)

function validate(user) {
	const errors = {}
	let hasErrors = false

	const schema = Joi.object({
		username: Joi.string().required(),
		email: Joi.string().email(),
		password: Joi.string().required(),
	})

	const { error } = schema.validate(user, { abortEarly: false })
	if (error) {
		hasErrors = true
		error.details.forEach(err => (errors[err.context.label] = err.message))
	}

	return { hasErrors, errors }
}

async function exists(user) {
	const errors = {}
	let hasErrors = false

	if (await User.findOne({ username: user.username })) {
		hasErrors = true
		errors["username"] = `User "${user.username}" already exists.`
	}
	if (await User.findOne({ email: user.email })) {
		hasErrors = true
		errors["email"] = `Email "${user.email}" is in use.`
	}

	return { hasErrors, errors }
}

module.exports = {
	User,
	exists,
	validate,
}
