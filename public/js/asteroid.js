import {utils} from './utils.js'
import { globals } from './globals.js';


export function Asteroid(speed = 90)
{
    this.coords = { x : 0, y : 0}

    // start off screen
    this.coords.x = utils.getRandomInt(-(globals.canvasWidth / 3), globals.canvasWidth * 1.3);
    this.coords.y = utils.getRandomInt(-(globals.canvasHeight / 2), 0);
    this.speed = speed;

    // set up target to shoot through, somewhere random on the bottom half of the canvas
    this.uv = utils.getUnitVector(this.coords.x, this.coords.y, 
        utils.getRandomInt(0, globals.canvasWidth),
        utils.getRandomInt(globals.canvasHeight / 2, globals.canvasWidth))
    
    this.draw = function() {
        var ctx = globals.gameCanvas.context;
        ctx.beginPath();
        ctx.arc(this.coords.x, this.coords.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = 'brown';
        ctx.fill();
    }

    this.update = function(deltaTime) {
        this.coords.x += this.uv.dx * deltaTime * this.speed;
        this.coords.y += this.uv.dy * deltaTime * this.speed;
    }

}

export function AsteroidBelt({maxAsteroids = 10, frequency = 0.1, minSpeed = 90, maxSpeed = 420} = {}) {
    this.maxAsteroids = maxAsteroids;
    this.frequency = frequency * 100;
    this.speedRange = { minimum : minSpeed, maximum : maxSpeed }

    this.asteroids = []

    // the game will try to spawn an asteroid every 'spawnEpoch' seconds.
    this.spawnEpoch = 1
    this.spawnTime = this.spawnEpoch

    this.draw = function() {
        this.asteroids.forEach(asteroid => asteroid.draw())
    }

    this.update = function(deltaTime) {

        this.spawnTime -= deltaTime;

        if (this.spawnTime <= 0) {
            this.spawnTime = this.spawnEpoch;
            
            if (this.asteroids.length < this.maxAsteroids) {
                if (utils.getRandomInt(0, 100) <= this.frequency) {
                    this.asteroids.push(
                        new Asteroid(utils.getRandomInt(this.speedRange.minimum, this.speedRange.maximum)))
                }
            }
        }

        for (var i = (this.asteroids.length - 1); i >= 0; i--) {
            this.asteroids[i].update(deltaTime);
            
            if (this.asteroids[i].coords.y > globals.canvasHeight) {
                this.asteroids = utils.removeItemFromArray(this.asteroids, i);
            }
        }
    }
}