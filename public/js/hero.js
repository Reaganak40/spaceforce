import { Rocket } from "./rocket.js";
import { globals } from "./globals.js";

export function Hero() {
    this.create = function() {
        this.rocket = new Rocket({speed : 700, scale : 1});
        this.rocket.follow_mouse = true;
        this.rocket.restrict_y = true;

        this.rocket.sprite.coords.y =  globals.canvasHeight - (this.rocket.sprite.height/2) - 15;
    }
    this.create()

    this.draw = function() {
        this.rocket.draw();
    }

    this.update = function(deltaTime) {
        this.rocket.update(deltaTime);
    }
}