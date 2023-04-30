const Victor = require('victor');
const Entity = require('./entity');

const maxSpeed = 10;
const maxForce = 1;
const maxAccel = 2;
const mass = 1;

class Player extends Entity {

    moveMag;
    
    constructor(newId, newName, newLocation) {
        super(newId, newName, newLocation, maxSpeed,maxForce,maxAccel,mass,0.05);
        this.radius = 40;
        this.moveMag = 40;

    }

    moveDirection(data) {
        var forceDirection = new Victor(0,0);
        
        if (data.sDown == true) {
            forceDirection.addScalarY(1);
        }

        if (data.dDown == true) {
            forceDirection.addScalarX(1);
        }

        if (data.aDown == true) {
            forceDirection.addScalarX(-1);
        }

        if (data.wDown == true) {
            forceDirection.addScalarY(-1);
        }
        
        console.log(forceDirection);
        this.cancelForce();
        this.applyForce(forceDirection);
    }

    getInitPack() {
        return {
            constructor: this.constructor.name,
            id: this.id,
            name: this.name,
            x: this.location.x,
            y: this.location.y,
            ///radius: this.radius
        }
    }
}

module.exports = Player;