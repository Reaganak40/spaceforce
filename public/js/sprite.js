import {utils} from './utils.js'
import { globals } from './globals.js';
import { rLocation } from './macros.js';
import { TextureFrame } from './texture.js'

export class Sprite {
    
    constructor({start_x = 0, start_y = 0, textureID = "asteroid1", scale=1, frameCycle = 2.5} = {}) {
        this.coords = { x : start_x, y : start_y}

        this.drawOffset = { dx : 0, dy : 0}
        this.origin = rLocation.topLeft;
            
        this.texture = globals.textures[textureID]
        this.image = new Image();
        this.image.src = this.texture.filepath;
        this.imageCoords = { sx : 0, sy: 0}
        this.textureFrame = new TextureFrame(frameCycle, this.texture.numFrames);
            
        this.width = this.texture.width * scale;
        this.height = this.texture.height * scale;
        
        this.rotation = 0;
        this.isRotated = false;

        this.origin = this.setOrigin(rLocation.center);
    }
    
        

    draw() {
        var ctx = globals.gameCanvas.context;
        var drawX = this.coords.x + this.drawOffset.dx;
        var drawY = this.coords.y + this.drawOffset.dy;
        
        if (this.isRotated) {
            ctx.save();
            ctx.translate(drawX, drawY);
            ctx.rotate(utils.degreesToRadians(this.rotation));
            
            ctx.drawImage(this.image, this.imageCoords.sx, this.imageCoords.sy, this.texture.width, this.texture.height, 
                0-(this.width/2), 0-(this.height/2), this.width, this.height);

            ctx.restore();
        } else {
            ctx.drawImage(this.image, this.imageCoords.sx, this.imageCoords.sy, this.texture.width, this.texture.height, 
                drawX, drawY, this.width, this.height);
        }
    }

    update(deltaTime) {
        // animate the rocket
        if (this.textureFrame.update(deltaTime)) {
            this.imageCoords.sx = this.textureFrame.frame * this.texture.width;
        }
    }

    rotate(dDegrees) {
        this.rotation = (this.rotation + dDegrees) % 360;
        this.isRotated = true;
    }

    fixRotation() {
        this.rotation = 0;
        this.isRotated = false;
    }

    setOrigin(nRLocation) {
        this.coords = utils.adjustOrigin(this.coords.x, this.coords.y, this.width, this.height, this.origin, nRLocation);
        this.origin = nRLocation
        this.drawOffset = utils.adjustDrawOffset(this.width, this.height, this.origin);
    }
}