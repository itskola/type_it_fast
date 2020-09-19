const mongoose = require("mongoose")
const Joi = require("joi")

// const minUsername = 1; const maxUsername = 50
// const minPassword = 1; const maxPassword = 50

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
