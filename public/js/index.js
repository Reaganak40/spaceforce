import {utils} from './utils.js'
import { rLocation } from './macros.js'

var canvasWidth = 800
var canvasHeight = 600

let gameCanvas;
var starfield;
var hero;


let secondsPassed;
let oldTimeStamp = 0;
let fps;

let mouse = {
    coords : {x : NaN, y : NaN},
}

window.addEventListener('DOMContentLoaded', function (e) {           
    startGame()
});

// Start Game
function startGame() {
    gameCanvas = new GameCanvas('canvas')
    gameCanvas.start()

    // enable mouse movement detection
    document.getElementById('canvas').addEventListener('mousemove', function(event) {
        mouse.coords = utils.getMouseCoords(event, gameCanvas);
    })


    document.getElementById('canvas').addEventListener('mouseleave', function(event) {
        mouse.coords.x = NaN;
        mouse.coords.y = NaN;
    })

    
    starfield = new StarField(100, 80);
    
    hero = new Rocket({speed : 400 });
    hero.follow_mouse = true;
    hero.setOrigin(rLocation.center);

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

function Rocket({start_x = 50, start_y = 50, width = 50, height = 50, speed = 200} = {})
{
    this.coords = { x : start_x, y : start_y}
    this.drawOffset = { dx : 0, dy : 0}
    this.origin = rLocation.topLeft;

    this.width = width;
    this.height = height;

    this.speed = speed;
    this.follow_mouse = false;

    this.draw = function() {
        var ctx = gameCanvas.context;
        var drawX = this.coords.x + this.drawOffset.dx;
        var drawY = this.coords.y + this.drawOffset.dy;
        
        ctx.fillStyle = 'red';
        ctx.fillRect(drawX, drawY, this.width, this.height);
    }

    this.update = function(deltaTime) {

        if (this.follow_mouse && utils.coordsExist(mouse.coords))
        {
            if (utils.getEuclideanDistance(this.coords.x, this.coords.y, mouse.coords.x, mouse.coords.y) < 5) {
                this.coords.x = mouse.coords.x;
                this.coords.y = mouse.coords.y
            } else {
                var uv = utils.getUnitVector(this.coords.x, this.coords.y, mouse.coords.x, mouse.coords.y)
                this.coords.x += uv.dx * deltaTime * speed;
                this.coords.y += uv.dy * deltaTime * speed;
            }
        }
    }

    this.setOrigin = function(nRLocation) {
        this.coords = utils.adjustOrigin(this.coords.x, this.coords.y, this.width, this.height, this.origin, nRLocation);
        this.origin = nRLocation
        this.drawOffset = utils.adjustDrawOffset(this.width, this.height, this.origin);
    }

}