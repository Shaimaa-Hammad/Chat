var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', socket => {
    socket.emit('message', 'Welcome in main group');
    socket.on('message', msg => io.emit('message', msg));
});

var js = io.of('/js');
js.on('connection', socket => {
    socket.emit('message', 'Welcome in js group');
    socket.on('message', msg => js.emit('message', msg));
});

var php = io.of('/php');
php.on('connection', socket => {
    socket.emit('message', 'Welcome in php group');
    socket.on('message', msg => php.emit('message', msg));
});

php.on('connection', socket => {
    socket.emit('message', 'Welcome in php group');
    socket.on('message', msg => php.emit('message', msg));
});

http.listen(3000, () => {
    console.log('listening on *:' + 3000);
});
