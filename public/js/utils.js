import { rLocation } from "./macros.js"

export var utils = {
    
    getRandomInt : function(min_inclusive, max_inclusive) {
        return Math.floor(Math.random() * (max_inclusive-min_inclusive+1)) + min_inclusive;
    },
    getMouseCoords: function(event, gameCanvas) {
        return {
            x : (event.clientX - gameCanvas.boundingRect.left) * gameCanvas.scaleX,
            y : (event.clientY - gameCanvas.boundingRect.top) * gameCanvas.scaleY
        }
    },
    coordsExist: function(coords) {
        return !(isNaN(coords.x) || isNaN(coords.y));
    },
    getUnitVector : function(x1, y1, x2, y2) {
        var theta = Math.atan2(y2-y1, x2-x1)
        return {
            dx : Math.cos(theta),
            dy : Math.sin(theta)
        }
    },
    getEuclideanDistance : function(x1, y1, x2, y2)
    {
        return Math.hypot(x2-x1, y2-y1)
    },
    getCoordsString: function(x, y) {
        return x + ", " + y
    },
    adjustOrigin: function(currentX, currentY, width, height, currentRLocation, nRLocation) {
        switch (currentRLocation) {
            case rLocation.topLeft:
                switch (nRLocation) {
                    case rLocation.topRight:
                        return { x : currentX + width, y : currentY }
                    case rLocation.center:
                        return { x : currentX + (width/2), y : currentY + (height/2) }
                    case rLocation.bottomLeft:
                        return { x : currentX, y : currentY + height }
                    case rLocation.bottomRight:
                        return { x : currentX + width, y : currentY + height }
                }
                break;
            case rLocation.topRight:
                switch (nRLocation) {
                    case rLocation.topLeft:
                        return { x : currentX - width, y : currentY }
                    case rLocation.center:
                        return { x : currentX - (width/2), y : currentY - (height/2) }
                    case rLocation.bottomLeft:
                        return { x : currentX - width, y : currentY - height }
                    case rLocation.bottomRight:
                        return { x : currentX, y : currentY + height }
                }
                break;
            case rLocation.center:
                switch (nRLocation) {
                    case rLocation.topLeft:
                        return { x : currentX - (width/2), y : currentY - (height/2) }
                    case rLocation.center:
                        return { x : currentX + (width/2), y : currentY - (height/2) }
                    case rLocation.bottomLeft:
                        return { x : currentX + (width/2), y : currentY + (height/2) }
                    case rLocation.bottomRight:
                        return { x : currentX - (width/2), y : currentY - (height/2) }
                }
                break;
            case rLocation.bottomLeft:
                switch (nRLocation) {
                    case rLocation.topLeft:
                        return { x : currentX, y : currentY - height }
                    case rLocation.topRight:
                        return { x : currentX + width, y : currentY + height }
                    case rLocation.center:
                        return { x : currentX + (width/2), y : currentY + (height/2) }
                    case rLocation.bottomRight:
                        return { x : currentX + width, y : currentY }
                }
                break;
            case rLocation.bottomRight:
                switch (nRLocation) {
                    case rLocation.topLeft:
                        return { x : currentX - width, y : currentY - height }
                    case rLocation.topRight:
                        return { x : currentX, y : currentY - height }
                    case rLocation.center:
                        return { x : currentX - (width/2), y : currentY - (height/2) }
                    case rLocation.bottomRight:
                        return { x : currentX - width, y : currentY }
                }
                break;
        }

        return { x:x, y:y}
    },
    adjustDrawOffset : function(width, height, origin) {
        switch (origin) {
            case rLocation.topRight:
                return { dx : -width, dy : 0}    
            case rLocation.center:
                return { dx : -(width / 2), dy : -(height / 2)}    
            case rLocation.topLeft:
                return { dx : 0, dy : -height}    
            case rLocation.topRight:
                return { dx : -height, dy : -height}    
        }
        
        // top left
        return { dx : 0, dy : 0} 
    },

    removeItemFromArray(arr, index) {
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    }

}