"use strict";
class ParticleHold {
    constructor(x = 0, y = 0) {
        this.reset()
        this.fadingSpeed = Math.random()
    }

    update() {
        this.position.x += Math.random() * 2 - 1
        this.position.y -= this.velocity.y
        this.alpha -= this.fadingSpeed

        if (this.alpha < 0) {
            this.reset()
        }
    }

    reset() {
        this.position = { 'x': 0, 'y': 0 }
        this.velocity = { 'x': 0, 'y': Math.random() - 0.4 }
        this.alpha = 1
        this.fadingSpeed = Math.random() * 0.03 + 0.005
    }
}

class ParticleEmitter {
    constructor(x = 0, y = 0) {
        this.position = { 'x': x, 'y': y }
        this.particles = []
        this.particlesNumber = 6

        for (let i = 0; i < this.particlesNumber; i++) {
            const particle = new ParticleHold()
            this.particles.push(particle)
        }
    }

    update() {
        for (let particle of this.particles) {
            particle.update()
        }
    }
}

class Experience {
    constructor(container) {
        this.canvas = document.createElement('canvas')
        container.appendChild(this.canvas)
        this.context = this.canvas.getContext('2d')

        const fps = 30
        this.fpsInterval = 1000 / fps
        this.then = Date.now()

        this.particleEmitters = []
        this.radius = window.innerWidth/20;

        for (let i = 0; i < 360; i++) {
            const particleEmitter = new ParticleEmitter(0, this.radius)
            this.particleEmitters.push(particleEmitter)
        }

        this.resize()
        this.bind()
        this.loop()
    }

    bind() {
        window.addEventListener('resize', this.resize.bind(this), false)
    }

    render() {
        for (let particleEmitter of this.particleEmitters) {
            particleEmitter.update()

            this.context.save()
            this.context.translate(this.canvas.width / 2, this.canvas.height / 2)
            this.context.rotate(this.particleEmitters.indexOf(particleEmitter) * Math.PI / 180)
            for (let particle of particleEmitter.particles) {
                particle.update()

                this.context.globalAlpha = particle.alpha
                this.context.beginPath()
                this.context.arc(particle.position.x, particleEmitter.position.y - particle.position.y, 1, 0, Math.PI * 2)
                this.context.fillStyle = '#ecf0f1'
                this.context.fill()
                this.context.closePath()
            }
            this.context.restore()
        }
    }

    loop() {
        this.raf = window.requestAnimationFrame(this.loop.bind(this))

        const now = Date.now()
        const delta = now - this.then

        if (delta > this.fpsInterval) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.render()
            this.then = now
        }
    }

    resize() {
        this.canvas.width = document.getElementById('dabanking-banner').offsetWidth;
        this.canvas.height = document.getElementById('dabanking-banner').offsetWidth/2.4;
        this.screen = {
            'center': { 'x': this.canvas.width / 2, 'y': this.canvas.height / 2 },
            'hypotenuse': Math.sqrt((this.canvas.width / 2 * this.canvas.width / 2) + (this.canvas.height / 2 * this.canvas.height / 2))
        }

        this.reset()
    }

    reset() {
        window.cancelAnimationFrame(this.raf)
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.loop()
    }
}

const getRandomColor = () => {
    const value = Math.floor(Math.random() * 255)
    return '#' + value.toString(16) + value.toString(16) + value.toString(16)
}

const container = document.getElementById('canvas')
const experience = new Experience(container)