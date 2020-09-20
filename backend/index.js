const express = require("express")
const socketio = require("socket.io")
const http = require("http")

require("dotenv").config({ path: "./config/.env" })
const DB_URI = process.env.DB_URI
const PORT = process.env.PORT || 5000

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

// Routes ================================================

app.use("/api/session", require("./routes/session"))
app.use("/api/account", require("./routes/account"))
app.use("/api/text-mode", require("./routes/textMode"))

// ================================================ Routes

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
