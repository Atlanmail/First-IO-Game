class Player {
    constructor(newId, newName, newX, newY) {
        this.id = newId;
        this.name = newName;
        this.x = newX;
        this.y = newY;
    }

    setLocation(newX, newY) {
        this.x = newX;
        this.y = newY;
    }

    getId() {
        return this.id;
    }
    draw() {
        ///console.log(this.x);
        push();
        fill(255,0,0);
        circle(this.x,this.y, 30);
        pop();
    }
}