import {utils} from './utils.js'
import { globals } from './globals.js'
import { rLocation } from './macros.js'
import { GameCanvas } from './gameCanvas.js'

import { StarField } from './stars.js'
import { Rocket } from './rocket.js'


let gameCanvas;
var starfield;
var hero;

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
    
    hero = new Rocket({speed : 700, start_y : (globals.canvasHeight * 0.85)});
    hero.setOrigin(rLocation.center);
    hero.follow_mouse = true;
    hero.restrict_y = true;

    drawQueue.addItem(starfield);
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
    //drawImageActualSize()
}