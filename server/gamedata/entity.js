const Victor = require('victor');

class Entity {
  constructor(newId, newName, newLocation, newMaxSpeed, newMaxForce, newMaxAccel, newMass, forceDecay) {
    if (!(newLocation instanceof Victor)) {
      this.location = new Victor(0, 0);
    } else {
      this.location = newLocation;
    }

    this.id = newId;
    this.name = newName;
    this.maxSpeed = newMaxSpeed;
    this.maxForce = newMaxForce;
    this.mass = newMass;
    this.maxAccel = newMaxAccel;
    this.velocity = new Victor(0, 0);
    this.force = new Victor(0, 0);
    this.acceleration = new Victor(0, 0);
    this.forceDecay = forceDecay;
  }

  applyForce(newForce) {
    if (!(newForce instanceof Victor)) {
      return;
    }

    this.force.add(newForce);

    if (this.force.magnitude() > this.maxForce) {
      this.force.normalize().multiplyScalar(this.maxForce);
    }
  }

  cancelForce() {
    this.force.multiplyScalar(0);
  }
  updateForce() {
    this.force.add(this.velocity.multiplyScalar(-1*this.forceDecay));
  }
  updateAcceleration() {
    ///console.log(this.force);
    this.acceleration.add((this.force));

    if (this.acceleration.magnitude() > this.maxAccel) {
        this.acceleration.normalize().multiplyScalar(this.maxAccel);
    }
    return;
  }

  updateVelocity() {
    this.velocity.add((this.acceleration));
    if (this.velocity.magnitude() > this.maxSpeed) {
      this.velocity.normalize().multiplyScalar(this.maxSpeed);
    }
  }

  updateLocation() {
    this.location.add(this.velocity);

    if (this.location.x > 700) {
      this.location.x = this.location.x % 700;
    }
    if (this.location.y > 700) {
      this.location.y = this.location.y % 700;
    }

  }
  getForce() {
    return this.force;
  }

  getVelocity() {
    return this.velocity;
  }

  getName() {
    return this.name;
  }

  getID() {
    return this.id;
  }

  getLocation() {
    return this.location;
  }
  update() {
    // TODO: implement update method
    ///console.log(this.location);
    this.updateForce();
    this.updateAcceleration();
    this.updateVelocity();
    this.updateLocation();
    this.cancelForce();
    
  }
}

module.exports = Entity;