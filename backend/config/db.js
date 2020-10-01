const mongoose = require("mongoose")

async function connect(uri, callback) {
	try {
		const conn = await mongoose.connect(uri, {
			useNewUrlParser: true,
            useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
        })
		callback(conn, null)
	} catch (err) {
		callback(null, err)
	}
}

module.exports = connect
