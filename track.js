class Track {
    constructor(center, radius) {
        this.center = center
        this.radius = radius
        this.period = Math.PI
    }

    getPosition(offset) {
        return {
            x: this.center.x + Math.cos(offset * 1) * this.radius,
            y: this.center.y - Math.abs(Math.sin(offset * 1)) * this.radius,
            round: Math.floor(offset / this.period)
        }
    }

    draw(ctx) {
        ctx.beginPath();

        for (let alpha = 0; alpha < Math.PI * 2; alpha += 0.05) {
            const pos = this.getPosition(alpha)
            ctx.lineTo(pos.x, pos.y)
        }
        ctx.closePath()

        ctx.strokeStyle = "white"
        ctx.stroke()
    }
}