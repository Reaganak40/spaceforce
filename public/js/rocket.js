import {utils} from './utils.js'
import { globals } from './globals.js'
import { Sprite } from './sprite.js';

export function Rocket({start_x = 50, start_y = 50, speed = 200, scale=1} = {})
{
    this.create = function() {
        this.sprite = new Sprite(
            {start_x : start_x, start_y : start_y, 
                textureID : 'rocket', scale:scale}
            );
        
        this.speed = speed;
        this.follow_mouse = false;
        this.restrict_y = false;
    }
    this.create()

    this.draw = function() {
        this.sprite.draw();
    }

    this.update = function(deltaTime) {
        
        // move the rocket
        if (this.follow_mouse && utils.coordsExist(globals.mouse.coords))
        {
            if (utils.getEuclideanDistance(this.sprite.coords, globals.mouse.coords) < 5) {
                this.sprite.coords.x = globals.mouse.coords.x;
                if (!this.restrict_y) {
                    this.sprite.coords.y = globals.mouse.coords.y
                }
            } else {
                var uv = utils.getUnitVector(this.sprite.coords, globals.mouse.coords)
                this.sprite.coords.x += uv.dx * deltaTime * this.speed;
                
                if (!this.restrict_y) {
                    this.sprite.coords.y += uv.dy * deltaTime * this.speed;
                }
            }
        }

        // animate the rocket
        this.sprite.update(deltaTime);
    }
}