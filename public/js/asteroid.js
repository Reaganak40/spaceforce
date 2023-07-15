import {utils} from './utils.js'
import { globals } from './globals.js';
import { trajectory } from './macros.js';
import { Sprite } from './sprite.js';

export function Asteroid(trajectoryType = trajectory.randomTarget)
{
    this.create = function() {
        this.trajectory = trajectoryType;
        
        var start_y = utils.getRandomInt(-(globals.canvasHeight / 2), 0);
        
        this.sprite = new Sprite(
            {start_x : 0, start_y : start_y, 
                textureID : 'asteroid1', scale:1}
            );
        
        var fitX = utils.getFittedRangeX(this.sprite.width);
        this.sprite.coords.x = utils.getRandomInt(fitX.min, fitX.max);
        
        // set up target to shoot through, somewhere random on the bottom half of the canvas
        this.uv = utils.getUnitVector(this.sprite.coords,
            {
                x : utils.getRandomInt(0, globals.canvasWidth),
                y : utils.getRandomInt(globals.canvasHeight / 2, globals.canvasWidth)
            });
        
        this.speed = 300;
        this.rotationSpeed = 80;
    }
    this.create()
    
    this.draw = function() {
        this.sprite.draw();
    }

    this.update = function(deltaTime) {
        if (this.trajectory == trajectory.randomTarget) {
            this.sprite.coords.x += this.uv.dx * deltaTime * this.speed;
            this.sprite.coords.y += this.uv.dy * deltaTime * this.speed;
        } else {
            this.sprite.coords.y += deltaTime * this.speed;
        }
        this.sprite.rotate(deltaTime * this.rotationSpeed);
    }

    this.isOutOfRange = function() {
        return (this.sprite.coords.y - this.sprite.height) > globals.canvasHeight;
    }
}

export function AsteroidBelt({maxAsteroids = 10, frequency = 0.1, minSpeed = 90, maxSpeed = 420} = {}) {
    this.maxAsteroids = maxAsteroids;
    this.frequency = frequency * 100;
    this.speedRange = { min : minSpeed, max : maxSpeed }

    this.asteroids = []

    // the game will try to spawn an asteroid every 'spawnEpoch' seconds.
    this.spawnEpoch = 0.3
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
                    this.asteroids.push(new Asteroid());
                    this.asteroids.at(-1).speed = utils.getRandomInt(this.speedRange.min, this.speedRange.max);
                    this.asteroids.at(-1).rotationSpeed = utils.getRandomInt(0, 180);

                }
            }
        }

        for (var i = (this.asteroids.length - 1); i >= 0; i--) {
            this.asteroids[i].update(deltaTime);
            
            if (this.asteroids[i].isOutOfRange()) {
                this.asteroids = utils.removeItemFromArray(this.asteroids, i);
            }
        }
    }
}