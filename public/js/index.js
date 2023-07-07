import {utils} from './utils.js'
import {eventHandler} from './eventHandler.js'

var canvasWidth = 800
var canvasHeight = 600

let gameCanvas;
var starfield;
var hero;


let secondsPassed;
let oldTimeStamp = 0;
let fps;

let mouse = {
    x : 0,
    y : 0,
}

window.addEventListener('DOMContentLoaded', function (e) {           
    startGame()
});

// Start Game
function startGame() {
    gameCanvas = new GameCanvas('canvas')
    gameCanvas.start()
    
    starfield = new StarField(100, 80);
    hero = new Rocket(50, 50);

    drawQueue.addItem(starfield);
    drawQueue.addItem(hero);

    window.requestAnimationFrame(gameLoop);
}


function GameCanvas(canvasID) {
    this.canvas = document.getElementById(canvasID),
    this.start = function() {
        
        // Setup canvas window
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        //this.canvas.style.cursor = 'none';
        this.context = this.canvas.getContext("2d");

        this.boundingRect = gameCanvas.canvas.getBoundingClientRect(),
        this.scaleX = this.canvas.width / this.boundingRect.width,    // relationship bitmap vs. element for x
        this.scaleY = this.canvas.height / this.boundingRect.height;  // relationship bitmap vs. element for y
    }
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
    
    // Calculate fps
    //fps = Math.round(1 / secondsPassed);
    //console.log(fps);

    // process input
    console.log(mouse.x + ", " + mouse.y);
    
    // update game
    starfield.update(secondsPassed);

    // render
    updateCanvas();

    // call next frame
    window.requestAnimationFrame(gameLoop);
}

function updateCanvas()
{
    var ctx = gameCanvas.context;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    drawQueue.drawAll();
}

function StarParticle() {
    this.x = utils.getRandomInt(0, canvasWidth);
    this.y = utils.getRandomInt(0, canvasHeight);
    this.radius = utils.getRandomInt(1, 2);

    this.draw = function() {
        var ctx = gameCanvas.context;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
    }
}

function StarField(numStars, speed)
{
    this.stars = []

    for (var i = 0; i < numStars; i++) {
        this.stars.push(new StarParticle);
    }

    this.update = function(deltaTime) {
        var dy = speed * deltaTime

        this.stars.forEach(star => {
            star.y += dy * 0.5 * star.radius;

            if (star.y > canvasHeight)
            {
                star.y = utils.getRandomInt(-10, 0);
                star.x = utils.getRandomInt(0, canvasWidth);
                this.radius = utils.getRandomInt(1, 2);
            }
        })
    }

    this.draw = function() {
        this.stars.forEach(star => star.draw())
    }
}

function Rocket(start_x, start_y)
{
    this.x = start_x;
    this.y = start_y;

    this.draw = function() {
        var ctx = gameCanvas.context;
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, 50, 50);
    }
}