const express = require("express")
const socketio = require("socket.io")
const http = require("http")
const path = require("path")

require("dotenv").config({ path: "./config/.env" })
const DB_URI = process.env.DB_URI
const PORT = process.env.PORT || 5000

// Database ==============================================

const connectDb = require("./config/db")

connectDb(DB_URI, (conn, err) => {
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

// WebSocket =============================================

const socketioSetup = require("./socketioIndex")
socketioSetup(io)

// ============================================= WebSocket

// Routes ================================================

app.use("/api/session", require("./routes/session"))
app.use("/api/account", require("./routes/account"))
app.use("/api/text-mode", require("./routes/textMode"))
app.use("/api/results", require("./routes/results"))

// ================================================ Routes

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "client", "build")))

	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "client", "build", "index.html"))
	})
}

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
