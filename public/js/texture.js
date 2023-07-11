export function Texture(filepath, width, height, numFrames) {
    this.filepath = filepath;
    this.width = width;
    this.height = height;
    this.numFrames = numFrames;
}

export function TextureFrame(cyclesPerSecond, maxFrames) {
    this.frame = 0;
    this.maxFrames = maxFrames
    this.frameRate = 1 / (cyclesPerSecond * maxFrames);
    this.timeToNextFrame = this.frameRate;

    this.update = function(deltaTime) {
        this.timeToNextFrame -= deltaTime;

        if (this.timeToNextFrame <= 0) {
            this.timeToNextFrame = this.frameRate;
            this.frame = (this.frame + 1) % this.maxFrames;
            return true;
        }
        return false;
    }
}