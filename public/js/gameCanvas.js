import { globals } from "./globals.js";

export function GameCanvas(canvasID) {
    this.canvas = document.getElementById(canvasID)
    this.start = function() {
        
        // Setup canvas window
        this.canvas.width = globals.canvasWidth;
        this.canvas.height = globals.canvasHeight;
        //this.canvas.style.cursor = 'none';
        this.context = this.canvas.getContext("2d");

        this.boundingRect = this.canvas.getBoundingClientRect(),
        this.scaleX = this.canvas.width / this.boundingRect.width,    // relationship bitmap vs. element for x
        this.scaleY = this.canvas.height / this.boundingRect.height;  // relationship bitmap vs. element for y
    }
}