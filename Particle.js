import {c} from './index.js'

export class Particle {
    constructor({position, velocity, color = 'purple'}) {
        this.position = position
        this.velocity = velocity
        this.color = color
        this.radius = 1
    }
    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = this.color
        c.fill()
    }
    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.draw()
    }
}