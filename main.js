const size = window.screen.width
myCanvas.width = size
myCanvas.height = size / 2

const speedSlider = document.getElementById('speedSlider')
speedSlider.addEventListener("input", updateSpeed);

const trackCenter = {x: size / 2, y: size / 2}
const trackMinRadius = 50
const trackStep = 15
const ballRadius = 7
const ballMinSpeed = 0.01
const ballSpeedStep = -0.0001

const soundFrequencies = [
    1760, 1567.98, 1396.91, 1318.51, 1174.66, 1046.5, 987.77, 880,
    783.99, 698.46, 659.25, 587.33, 523.25, 493.88, 440, 392, 349.23,
    329.63, 293.66, 261.63
];

const tracks = []
const balls = []
const N = 20

for (let i = 0; i < N; i++) {
    const trackRadius = trackMinRadius + i * trackStep
    const ballSoundFreq = soundFrequencies[i]

    const baseHue = (i * 360) / N
    // const otherHue = (i * 360) / N / 2.5 + 215
    const trackHue = baseHue
    const ballHue = baseHue
    
    const track = new Track(trackCenter, trackRadius, trackHue)
    const ball = new Ball(track, ballRadius, ballSoundFreq, ballHue)

    tracks.push(track)
    balls.push(ball)
}
updateSpeed()

const ctx = myCanvas.getContext("2d")

animate()

function animate() {
    ctx.clearRect(0, 0, size, size)

    tracks.forEach((track) => {
        track.draw(ctx)
    })
    balls.forEach((ball) => {
        ball.move()
        ball.draw(ctx)
    })
    
    requestAnimationFrame(animate)
}

function updateSpeed() {
    const sliderVal = speedSlider.value / 10
    const speedFactor = Math.pow(sliderVal, 3)  * 27/1000

    for (let i = 0; i < N; i++) {
        const ballSpeed = (ballMinSpeed + i * ballSpeedStep) * speedFactor
        balls.at(i).setSpeed(ballSpeed)
    }
}