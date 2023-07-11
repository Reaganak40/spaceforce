import {utils} from './utils.js'
import { globals } from './globals.js';

function StarParticle() {
    this.x = utils.getRandomInt(0, globals.canvasWidth);
    this.y = utils.getRandomInt(0, globals.canvasHeight);
    this.radius = utils.getRandomInt(1, 2);

    this.draw = function() {
        var ctx = globals.gameCanvas.context;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
    }
}

export function StarField(numStars, speed)
{
    this.stars = []

    for (var i = 0; i < numStars; i++) {
        this.stars.push(new StarParticle(this.canvasRef));
    }

    this.update = function(deltaTime) {
        var dy = speed * deltaTime

        this.stars.forEach(star => {
            star.y += dy * 0.5 * star.radius;

            if (star.y > globals.canvasHeight)
            {
                star.y = utils.getRandomInt(-10, 0);
                star.x = utils.getRandomInt(0, globals.canvasWidth);
                this.radius = utils.getRandomInt(1, 2);
            }
        })
    }

    this.draw = function() {
        this.stars.forEach(star => star.draw())
    }
}