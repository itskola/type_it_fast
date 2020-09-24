// redis ?
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

module.exports = io => {
	io.on("connect", socket => {
		socket.on("join", ({ username }) => {
			connUsers.add(socket.id, username)
			io.emit("users", { connectedUsers: connUsers.getUsernames().sort() })
		})

		socket.on("message", message => {
			socket.broadcast.emit("message", message)
		})

		socket.on("disconnect", () => {
			connUsers.remove(socket.id)
			io.emit("users", { connectedUsers: connUsers.getUsernames().sort() })
		})
	})
}