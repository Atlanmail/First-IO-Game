class Asteroid {
    constructor(newId, newName, newX, newY, newRadius) {
        this.id = newId;
        this.name = newName;
        this.x = newX;
        this.y = newY;
        this.radius = newRadius;
    }

    

    draw() {
        ///console.log(this.x);
        push();
        circle(this.x,this.y, this.radius);
        pop();
    }
}