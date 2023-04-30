const Victor = require('victor');
const Entity = require('../server/gamedata/entity.js');
const Asteroid = require('../server/gamedata/asteroid.js');
test('makesureVector magnitude is fine', ()=> {
    var myEntity = new Entity(519, "test", new Victor(10,10), 50, 3, 10,10);

    myEntity.applyForce(new Victor(20,0));
    expect(myEntity.getForce()).toEqual(new Victor(3,0));

});

test('baseAsteroid', ()=> {
    var myAsteroid = new Asteroid(519, "test", new Victor(15,20),20);

    expect(myAsteroid.getInitPack()).toEqual({
        constructor: "Asteroid",
        id: 519,
        name: "test",
        x: 15,
        y: 20,
        radius: 20})
})