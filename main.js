const screenWidth = window.screen.width
const screenHeight = window.screen.height
myCanvas.width = screenWidth
myCanvas.height = screenHeight
const sizeFactor = 2

const speedSlider = document.getElementById('speedSlider')
speedSlider.addEventListener("input", updateSpeed);

const trackCenter = {x: screenWidth / 2, y: screenHeight}
const trackMinRadius = 50 * sizeFactor
const trackStep = 15 * sizeFactor
const ballRadius = 7 * sizeFactor
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
    ctx.clearRect(0, 0, screenWidth, screenHeight)

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
    speedFactor = (Math.pow(sliderVal, 3) + sliderVal) * 25/1000
    
    // console.log(`
    //      updated speedFactor = ${speedFactor}
    //      sliderVal = ${sliderVal}
    // `)

    for (let i = 0; i < N; i++) {
        const ballSpeed = (ballMinSpeed + i * ballSpeedStep) * speedFactor
        balls.at(i).setSpeed(ballSpeed)
    }
}