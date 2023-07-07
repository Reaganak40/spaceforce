export var eventHandler = {
    onMouseMove: function(event)
    {
        mouse.x = (event.clientX - gameCanvas.boundingRect.left) * gameCanvas.scaleX;
        mouse.y = (event.clientY - gameCanvas.boundingRect.top) * gameCanvas.scaleY;
    }
}