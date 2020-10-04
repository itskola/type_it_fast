const bcrypt = require("bcrypt")

class Hash {
	static saltRounds = 10

	static generate = password =>
		new Promise(async (resolve, reject) => {
			try {
				const salt = await bcrypt.genSalt(Hash.saltRounds)
				const hash = await bcrypt.hash(password, salt)
				resolve(hash)
			} catch (err) {
				reject(err)
			}
		})

	static compare = (password, hash) => bcrypt.compare(password, hash)
}

module.exports = Hash
