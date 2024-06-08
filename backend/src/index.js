const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const rutas = require('./rutas');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

const PUERTO = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/tareas', rutas);

io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado');
    });
});

app.set('socketio', io);

server.listen(PUERTO, () => {
    console.log(`Servidor ejecutándose en el puerto ${PUERTO}`);
});
