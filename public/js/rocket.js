import {utils} from './utils.js'
import { rLocation } from './macros.js'
import { globals } from './globals.js'
import { TextureFrame } from './texture.js'

export function Rocket({start_x = 50, start_y = 50, width = 42, height = 65, speed = 200} = {})
{
    this.coords = { x : start_x, y : start_y}
    this.drawOffset = { dx : 0, dy : 0}
    this.origin = rLocation.topLeft;

    this.width = width;
    this.height = height;

    this.speed = speed;

    this.follow_mouse = false;
    this.restrict_y = false;

    this.texture = globals.textures['rocket']
    this.image = new Image(this.width, this.height);
    this.image.src = this.texture.filepath;
    this.imageCoords = { sx : 0, sy: 0}
    this.textureFrame = new TextureFrame(2, this.texture.count);


    this.draw = function() {
        var ctx = globals.gameCanvas.context;
        var drawX = this.coords.x + this.drawOffset.dx;
        var drawY = this.coords.y + this.drawOffset.dy;
        
        ctx.drawImage(this.image, this.imageCoords.sx, this.imageCoords.sy, this.texture.width, this.texture.height, 
            drawX, drawY, this.width, this.height);
    }

    this.update = function(deltaTime) {
        
        // move the rocket
        if (this.follow_mouse && utils.coordsExist(globals.mouse.coords))
        {
            if (utils.getEuclideanDistance(this.coords.x, this.coords.y, globals.mouse.coords.x, globals.mouse.coords.y) < 5) {
                this.coords.x = globals.mouse.coords.x;
                if (!this.restrict_y) {
                    this.coords.y = globals.mouse.coords.y
                }
            } else {
                var uv = utils.getUnitVector(this.coords.x, this.coords.y, globals.mouse.coords.x, globals.mouse.coords.y)
                this.coords.x += uv.dx * deltaTime * speed;
                
                if (!this.restrict_y) {
                    this.coords.y += uv.dy * deltaTime * speed;
                }
            }
        }

        // animate the rocket
        if (this.textureFrame.update(deltaTime)) {
            console.log("update");
            this.imageCoords.sx = this.textureFrame.frame * this.texture.width;
        }
    }

    this.setOrigin = function(nRLocation) {
        this.coords = utils.adjustOrigin(this.coords.x, this.coords.y, this.width, this.height, this.origin, nRLocation);
        this.origin = nRLocation
        this.drawOffset = utils.adjustDrawOffset(this.width, this.height, this.origin);
    }

}