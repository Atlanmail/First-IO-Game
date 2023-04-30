const path = require("path");
/**
 * 
 */
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const Asteroid = require("./gamedata/asteroid");
const Victor = require("victor");
const Player = require("./gamedata/player");

var publicPath = path.join(__dirname, '../client');
var port = process.env.PORT || 2000;
var app = express();
var server = http.createServer(app); // 
const io = socketIO(server);
app.use(express.static(publicPath)); /// this sends client folder to each client who connects

var entities = []; /// class of all entities
var asteroids = [];
var players = [];

begin();

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('imReady', (data) => {
        player = new Player(socket.id, data.name, new Victor(getRandomInt(0,50),getRandomInt(0,50)));
        socket.emit("yourID", {id: player.id});
        entities.push(player);
        players.push(player);

        socket.broadcast.emit("newPlayer", player.getInitPack());

        socket.emit("initEntities", {initPack: getAllEntitiesInitPack()});
    });

    socket.on("inputData", (data) => {
        for (var i in players) {
            if (players[i].getID() == socket.id) {
                players[i].moveDirection(data);
            }
        }
        
    });

    socket.on("disconnect", () => {
        io.emit('someoneLeft', {id: socket.id});

        entities = entities.filter((element) => element.id !== socket.id);
        players = players.filter((element) => element.id !== socket.id);
    });
});
 

server.listen(port,() => {
    console.log("server started " + port);
});

function begin() { /// runs on server begin
    for (let i = 0 ; i < 30 ; i++) {
        var currentAsteroid = new Asteroid(i, "Asteroid", new Victor(getRandomInt(0,700),getRandomInt(0,700)),20);

        entities.push(currentAsteroid);
        asteroids.push(currentAsteroid);
    }
}

setInterval(() => {
    var updatePack = [];

    for (var i in players) {
        ///console.log(players[i]);
        players[i].update();
        updatePack.push(players[i].getInitPack());
    }
    ///console.log(updatePack);
    io.emit("updatePack", {updatePack});
}, 1000/35);

function getAllEntitiesInitPack() {
    var initPack = [];

    for (var i in entities) {
        initPack.push(entities[i].getInitPack());
    }
    return initPack;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}