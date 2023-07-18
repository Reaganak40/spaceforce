import { Texture } from "./texture.js";
export var globals = {
    canvasWidth : 800,
    canvasHeight : 600,
    gameCanvas : () => {
        return NaN;
    },
    mouse : {
        coords : {x : NaN, y : NaN},
    },

    textures : {
        "rocket" : new Texture("../img/rocket.png", 42, 65, 3),
        "asteroid1" : new Texture("../img/asteroid1.png", 36, 33, 1),
        "asteroid2" : new Texture("../img/asteroid2.png", 30, 30, 1),
    }

}
