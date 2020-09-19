const express = require("express")
const socketio = require("socket.io")
const http = require("http")

require("dotenv").config({ path: "./config/.env" })

// Database ==========================================

const connectDB = require("./config/db")
const DB_URI = process.env.DB_URI

connectDB(DB_URI, (conn, err) => {
	if (err) { console.error(err); process.exit(1) }
	console.log("Database connection established successfully")
})

const Sentence = require("./models/sentence")

// ========================================== Database

const app = express()
const server = http.createServer(app)
var io = socketio(server)

// Middleware ========================================

app.use(express.json())
app.use(require("cookie-parser")())

// ======================================== Middleware

const connectedUsers = new Set()

io.on("connect", socket => {
	socket.on("join", ({ username }) => {
		connectedUsers.add(username)
		io.emit("users", { connectedUsers: [...connectedUsers] })
	})

	socket.on("message", newMessage => {
		socket.broadcast.emit("message", newMessage)
	})

	socket.on("disconnect", () => {
		console.log("user disconnected")
	})
})

app.use("/api/session", require("./routes/session"))

app.get("/sentence", async (req, res) => {
	// Model.aggregate([{ $sample: { size: 1 } }])

	// let date
	// for (let i = 0; i < 5e6; ++i) date = new Date()
	// console.log(date)

	Sentence.countDocuments().exec((err, count) => {
		var r = Math.floor(Math.random() * count)
		Sentence.findOne().skip(r)
			.exec((err, result) => {
				if (err) return res.send(500).send("-")
				// create error msg object
				res.status(200).send(result.text)
			})
	  })
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
