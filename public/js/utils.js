import { rLocation } from "./macros.js"
import { globals } from "./globals.js";

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
    getUnitVector : function(point1 = {x : 0, y : 0}, point2 = {x : 0, y : 0}) {
        var theta = Math.atan2(point2.y-point1.y, point2.x-point1.x)
        return {
            dx : Math.cos(theta),
            dy : Math.sin(theta)
        }
    },
    getEuclideanDistance : function(point1 = {x : 0, y : 0}, point2 = {x : 0, y : 0})
    {
        return Math.hypot(point2.x-point1.x, point2.y-point1.y);
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

    removeItemFromArray : function(arr, index) {
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    },

    degreesToRadians : function(degrees) {
        return degrees * (Math.PI / 180);
    },

    getFittedRangeX(width) {
        return { min : width/2, max : globals.canvasWidth - (width/2)}; 
    }

}