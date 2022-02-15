import {Invader} from "./invader.js"
import {canvas} from "./index.js"
import {c} from "./index.js"

export class Grid {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        }

        this.velocity = {
            x: 3,
            y: 0
        }

        this.invaders = []
        const columns = Math.random() * 10 + 5
        const rows = Math.random() * 5 + 2
        this.width = columns * 30
        this.loaded = false

        const image = new Image()
        image.src = './assets/invaders.png'
        image.onload = () => {
            for (let x = 0; x < columns; x++) {
                for (let y = 0; y < rows; y++) {
                    const type = Math.floor(Math.randomInterval(0, 5))
                    this.invaders.push(new Invader({
                        position: {
                            x: x * image.width * Invader.scale * Invader.aspect + 15 * x,
                            y: y * image.height / 6 * Invader.scale + 5
                        },
                        type: type
                    }))
                }
            }
            this.loaded = true
        }
        this.collided = false
    }

    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.velocity.y = 0
        if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
            this.velocity.x = - this.velocity.x
            this.velocity.y += 30
        }
        this.invaders.forEach( (invader) => {
            invader.update({
                velocity: this.velocity
            })
        })
    }

    clean() {
        this.invaders.forEach((invader, index) => {
            if (invader.collided)
                this.invaders.splice(index, 1)
        })

        this.collided = !this.invaders.length && this.loaded
    }
}