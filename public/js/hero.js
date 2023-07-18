import { Rocket } from "./rocket.js";
import { globals } from "./globals.js";

export class Hero{
    
    constructor() {
        this.rocket = new Rocket({speed : 700, scale : 1});
        this.rocket.follow_mouse = true;
        this.rocket.restrict_y = true;

        this.rocket.sprite.coords.y =  globals.canvasHeight - (this.rocket.sprite.height/2) - 15;
    }

    draw() {
        this.rocket.draw();
    }

    update(deltaTime) {
        this.rocket.update(deltaTime);
    }
}