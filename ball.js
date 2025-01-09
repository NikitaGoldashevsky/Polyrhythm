class Ball{
    constructor(track, radius, speed, soundFreq) {
        this.track = track
        this.radius = radius
        this.speed = speed
        this.offset = 0
        this.center = this.track.getPosition(this.offset)
        this.round = 0
        this.soundFreq = soundFreq
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2)
        ctx.strokeStyle = "white"
        ctx.stroke()
    }
 
    move() {
        this.offset += this.speed
        const res = this.track.getPosition(this.offset)
        this.center = { x: res.x, y: res.y }
        if (res.round != this.round) {
            playSound(this.soundFreq)
            this.round = res.round
        }
    }
}