export var utils = {
    
    getRandomInt : function(min_inclusive, max_inclusive) {
        return Math.floor(Math.random() * (max_inclusive-min_inclusive+1)) + min_inclusive;
    },

    helloWorld : function() {
        return 'hello world!'
    }
}