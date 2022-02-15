import {c, canvas} from "./index.js"

export class Background {
    constructor() {
        this.positions = []
        this.density = 1
        this.velocity = 2
        this.radius = 0.8
    }

    animate() {
        this.positions.forEach((position, index, array) => {
            position.y += this.velocity
            if (position.y >= canvas.height){
                this.positions.splice(index, 1)
            }
        })
        for (let i = 0; i <= this.density; i++) {
            const position = {
                x: Math.randomInterval(0, canvas.width),
                y: 0
            }
            this.positions.push(position)
        }
        this.draw()
    }

    draw () {
        this.positions.forEach(position => {
            c.beginPath()
            c.arc(position.x, position.y, this.radius, 0, Math.PI * 2)
            c.fillStyle = 'white'
            c.fill()
        })

    }

    static createStar() {

    }
}