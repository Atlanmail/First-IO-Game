var socket;
function preload() {

}

function setup() {
    socket = io();
    socket.emit('imReady', {name: "Tiep"});
    entities = [];

    createCanvas(windowWidth, windowHeight);
    
    socket.on("initEntities", function(data) {
        for (var i in data.initPack) {
            if (data.initPack[i].constructor == "Asteroid") {
                var asteroid = new Asteroid(data.initPack[i].id,data.initPack[i].name,data.initPack[i].x,data.initPack[i].y,data.initPack[i].radius);
                entities.push(asteroid);
            }
        }
    });


}

function draw() {
    background(255,255,255);
    for(var i in entities) {
        entities[i].draw();
        
    }
}
