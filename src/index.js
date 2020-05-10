const app = require('./app');
const http = require('http').Server(app);
const socketio = require('socket.io')(http)

const port = process.env.PORT || 3003;

require('./components/socket.io')(socketio);

http.listen(port, () => {
	console.log(`listening on http://localhost:${port}`);
});