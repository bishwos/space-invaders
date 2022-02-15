import {canvas} from "./index.js"
import {c} from "./index.js"
import {Area} from "./Area.js"
import {Collidable} from "./Collidable.js"

export class Invader extends Collidable {
    static scale = 0.14
    static aspect = 0.9
    constructor({position, type}) {
        super()
        const image = new Image()
        image.src = './assets/invaders.png'
        this.position = position
        this.type = type
        image.onload = () => {
            this.image = image
            this.width = this.image.width * Invader.scale
            this.height = this.image.height /6 * Invader.scale * Invader.aspect
        }
        this.collided = false
    }

    draw() {
        if (this.collided)
            return
        c.drawImage(
            this.image,
            0,
            224 * this.type,
            266,
            224,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
    }

    update({velocity}) {
        if (this.image) {
            this.position.x += velocity.x
            this.position.y += velocity.y
            this.draw()
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