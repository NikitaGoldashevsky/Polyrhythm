class Track {
    constructor(center, radius) {
        this.center = center
        this.radius = radius
    }

    getPosition(offset) {
        return {
            x: this.center.x + Math.cos(offset * 1) * this.radius,
            y: this.center.y - Math.sin(offset * 1) * this.radius
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