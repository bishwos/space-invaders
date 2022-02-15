import {canvas} from "./index.js"
import {c} from "./index.js"
import {Area} from "./Area.js"
import {Collidable} from "./Collidable.js"

export class Player extends Collidable{
    constructor() {
        super()
        this.velocity = {
            x: 0,
            y: 0
        }
        this.rotation = 0
        this.width = 50
        this.height = 50
        this.position = {
            x: canvas.width / 2 - this.width / 2,
            y: canvas.height - this.height - 20
        }
        const scale = .15
        const image = new Image()
        image.src = './assets/spaceship.png'
        image.onload = () => {
            this.image = image

            this.width = this.image.width * scale
            this.height = this.image.height * scale
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 20
            }
        }
        this.collided = false
        this.type = 0
    }

    draw() {
        c.save()
        c.translate(
            this.position.x + this.width / 2,
            this.position.y + this.height / 2
        )
        c.rotate(this.rotation)
        c.translate(
            -this.position.x - this.width / 2,
            -this.position.y - this.height / 2
        )
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
        c.restore()
    }

    update() {
        if (this.image) {
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
            this.draw()
        }
    }

    get nozzlePosition() {
        return {
            x: this.position.x + this.width / 2,
            y: this.position.y
        }
    }

    get area() {
        const top = this.position
        const bottom = {
            x: this.position.x + this.width,
            y: this.position.y + this.height
        }
        return new Area({top, bottom})
    }
}