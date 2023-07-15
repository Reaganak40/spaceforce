import {utils} from './utils.js'
import { globals } from './globals.js'
import { rLocation, trajectory } from './macros.js'
import { GameCanvas } from './gameCanvas.js'

import { Hero } from './hero.js'
import { StarField } from './stars.js'
import { Asteroid, AsteroidBelt } from './asteroid.js'

var starfield;
var hero;
var asteroidBelt;

let secondsPassed;
let oldTimeStamp = 0;
let fps;

window.addEventListener('DOMContentLoaded', function (e) {           
    startGame()
});

// Start Game
function startGame() {
    globals.gameCanvas = new GameCanvas('canvas')
    globals.gameCanvas.start()

    // enable mouse movement detection
    document.getElementById('canvas').addEventListener('mousemove', function(event) {
        globals.mouse.coords = utils.getMouseCoords(event, globals.gameCanvas);
    })


    document.getElementById('canvas').addEventListener('mouseleave', function(event) {
        globals.mouse.coords.x = NaN;
        globals.mouse.coords.y = NaN;
    })

    starfield = new StarField(100, 80);

    hero = new Hero();

    asteroidBelt = new AsteroidBelt({maxAsteroids : 60,  frequency : 0.95, minSpeed : 100, maxSpeed : 200});
    asteroidBelt.spawnEpoch = 0.7

    drawQueue.addItem(starfield);
    drawQueue.addItem(asteroidBelt);
    drawQueue.addItem(hero);

    window.requestAnimationFrame(gameLoop);
}

var drawQueue = {
    queue: [],
    addItem: function(item) {
        this.queue.push(item)
    },
    removeItem: function(index) {
        this.queue.splice(index, 1);
    },
    drawAll: function() {
        this.queue.forEach(item => item.draw());
    }
}


function gameLoop(timeStamp) {
    
    
    // Calculate the number of seconds passed since the last frame
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;
    secondsPassed = Math.min(secondsPassed, 0.1);
    
    //Calculate fps
    //fps = Math.round(1 / secondsPassed);
    //console.log(fps);

    // process input
    
    // update game
    starfield.update(secondsPassed);
    asteroidBelt.update(secondsPassed);
    hero.update(secondsPassed);

    // render
    updateCanvas();

    // call next frame
    window.requestAnimationFrame(gameLoop);
}

function updateCanvas()
{
    var ctx = globals.gameCanvas.context;
    ctx.clearRect(0, 0, globals.canvasWidth, globals.canvasHeight);
    
    drawQueue.drawAll();
}