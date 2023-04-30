var socket;
function preload() {

}

function setup() {
    socket = io();
    socket.emit('imReady', {name: "Tiep"});
    entities = [];
    players = [];

    createCanvas(windowWidth, windowHeight);
    
    socket.on("initEntities", function(data) {
        for (var i in data.initPack) {
            if (data.initPack[i].constructor == "Asteroid") {
                var asteroid = new Asteroid(data.initPack[i].id,data.initPack[i].name,data.initPack[i].x,data.initPack[i].y,data.initPack[i].radius);
                entities.push(asteroid);
            }
            else if (data.initPack[i].constructor == "Player") {
                var player = new Player(data.initPack[i].id,data.initPack[i].name,data.initPack[i].x,data.initPack[i].y);
                entities.push(player);
                players.push(player);
            }
        }
    });

    socket.on("newPlayer", function(data) {
        console.log(data);
        var player = new Player(data.id,data.name,data.x,data.y);
        entities.push(player);
        players.push(player);
    })
    socket.on("updatePack", function(data) {
        ///console.log(data);
        for (var i in data.updatePack) {
            for(var j in players) {
                if(players[j].getId() == data.updatePack[i].id) {
                    players[j].setLocation(data.updatePack[i].x,data.updatePack[i].y);
                }
            }
        }
    });

    socket.on("someoneLeft", function(data) {
        for(var i in players) {
            if(players[i].id === data.id) {
                players.splice(i, 1);
            }

        }

        for(var i in entities) {
            if(entities[i].id === data.id) {
                entities.splice(i, 1);
            }

        } 
    })

}

function draw() {

    sendInputData();

    background(255,255,255);
    for(var i in entities) {
        entities[i].draw();
        
    }
}

var wDown = false;
var aDown = false;
var sDown = false;
var dDown = false;
window.addEventListener('keydown', function (event) {
    if (event.key == "w") {
        wDown = true;
    }
    else if (event.key == "a") {
        aDown = true;
    }
    else if (event.key == "s") {
        sDown = true;
    }
    else if (event.key = "d") {
        dDown = true;
    }
}, false);

window.addEventListener('keyup', function (event) {
    if (event.key == "w") {
        wDown = false;
    }
    else if (event.key == "a") {
        aDown = false;
    }
    else if (event.key == "s") {
        sDown = false;
    }
    else if (event.key = "d") {
        dDown = false;
    }
}, false);

function sendInputData() {
    var data;
    socket.emit("inputData", {wDown, aDown, sDown,dDown});
}