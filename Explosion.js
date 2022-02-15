import {Particle} from "./Particle.js"

export class Explosion {
    constructor({position, color = 'purple'}) {
        this.position = position
        this.particles = []
        this.color = color
        for (let i = 0; i < 20; i++) {
            const velocity = {
                x: 5 - Math.random() * 10,
                y: 5 - Math.random() * 10
            }
            const particle = new Particle({position, velocity, color})
            this.particles.push(particle)
        }
        this.time = Date.now()
        this.collided = false
    }

    update() {
        if (Date.now() - this.time > 1000) {
            this.collided = true
        }
        this.particles.forEach(particle => particle.update())
    }

    static explode({position}) {
        return new Explosion({position})
    }
}