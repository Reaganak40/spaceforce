export function Texture(filepath, width, height, count) {
    this.filepath = filepath;
    this.width = width;
    this.height = height;
    this.count = count;
}

export function TextureFrame(timesPerSecond, maxFrames) {
    this.frame = 0;
    this.maxFrames = maxFrames
    this.frameRate = 1 / (timesPerSecond * maxFrames);
    this.timeToNextFrame = this.frameRate;
    console.log(this.frameRate)
    this.update = function(deltaTime) {
        this.timeToNextFrame -= deltaTime;

        if (this.timeToNextFrame <= 0) {
            this.timeToNextFrame = this.frameRate;
            this.frame = (this.frame + 1) % maxFrames;
            return true;
        }
        return false;
    }
}