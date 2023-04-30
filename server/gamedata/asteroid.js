const Entity = require('./entity');

class Asteroid extends Entity {
    
    constructor(newId, newName, newLocation, newRadius) {
        super(newId, newName, newLocation, 0,0,0,0,0);
        this.radius = newRadius;
    }


    getInitPack() {
        return {
            constructor: this.constructor.name,
            id: this.id,
            name: this.name,
            x: this.location.x,
            y: this.location.y,
            radius: this.radius
        }
    }
}

module.exports = Asteroid;