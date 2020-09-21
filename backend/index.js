const express = require("express")
const socketio = require("socket.io")
const http = require("http")

require("dotenv").config({ path: "./config/.env" })
const DB_URI = process.env.DB_URI
const PORT = process.env.PORT

// Database ==============================================

const connectDB = require("./config/db")

connectDB(DB_URI, (conn, err) => {
	if (err) {
		console.error(err)
		process.exit(1)
	}
	console.log("Database connection established")
})

// ============================================== Database

const app = express()
const server = http.createServer(app)
var io = socketio(server)

// Middleware ============================================

app.use(express.json())
app.use(require("cookie-parser")())

// ============================================ Middleware

const connUsers = (function () {
	const users = []

	return {
		add: (id, username) => {
			users.push({ id, username })
		},
		remove: id => {
			const index = users.findIndex(user => user.id === id)
			users.splice(index, 1)
		},
		getUsernames: () => users.map(user => user.username),
	}
})()

io.on("connect", socket => {
	socket.on("join", ({ username }) => {
		// console.log("New:", socket.id, "-", username)
		connUsers.add(socket.id, username)
		io.emit("users", { connectedUsers: connUsers.getUsernames() })
	})

	socket.on("message", message => {
		socket.broadcast.emit("message", message)
	})

	socket.on("disconnect", () => {
		// console.log("New:", socket.i	d, "-", username)
		connUsers.remove(socket.id)
		io.emit("users", { connectedUsers: connUsers.getUsernames() })
	})
})

// Routes ================================================

app.use("/api/session", require("./routes/session"))
app.use("/api/account", require("./routes/account"))
app.use("/api/text-mode", require("./routes/textMode"))

// ================================================ Routes

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
