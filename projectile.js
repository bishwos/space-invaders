import {canvas} from "./index.js"
import {c} from "./index.js"
import {Area} from "./Area.js"
import {Collidable} from "./Collidable.js"

export class Projectile extends Collidable{
    constructor({position, velocity}) {
        super()
        this.position = position
        this.velocity = velocity
        this.radius = 3
        this.collided = false
        this.type = 0
    }

    draw() {
        if (this.collided)
            return
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'red'
        c.fill()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }

    get area() {
        const top = {x: this.position.x - this.radius, y: this.position.y - this.radius}
        const bottom = {x: this.position.x + this.radius, y: this.position.y + this.radius}
        return new Area({top, bottom})
    }

}