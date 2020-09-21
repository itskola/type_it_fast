const bcrypt = require("bcrypt")

const saltRounds = 10

const generateHash = password =>
	new Promise(async (resolve, reject) => {
		try {
			const salt = await bcrypt.genSalt(saltRounds)
			const hash = await bcrypt.hash(password, salt)
			resolve(hash)
		} catch (err) {
			reject(err)
		}
	})

const compareToHash = (password, hash) => bcrypt.compare(password, hash)

module.exports = {
	generateHash,
	compareToHash,
}
