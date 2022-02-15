import {keys} from "./keys.js"
import {Projectile} from "./projectile.js"
import {Grid} from "./grid.js"
import {Player} from "./player.js"
import {canvas, c} from "./index.js"
import {Explosion} from "./Explosion.js"
import {Background} from "./Background.js"
import {Invader} from "./invader.js"

export class Game {
    constructor() {
        this.start()
        this.update()
    }

    start() {
        this.player = new Player()
        this.projectiles = []
        this.grids = []
        this.frames = 0
        this.randomInterval = Math.floor(Math.random() * 500 + 500)
        this.colliders = []
        this.score = 0
        this.explosions = []
        this.background = new Background()
        this.gameover = false
    }
    update() {
        requestAnimationFrame(() => this.update())
        c.fillStyle = 'black'
        c.fillRect(0, 0, canvas.width, canvas.height)
        this.background.animate()

        this.processKeys()
        this.player.update()
        this.grids.forEach(grid => {
            grid.update()
        })
        this.projectiles.forEach(projectile => {
            projectile.update()
        })
        this.explosions.forEach((explosion, index) => {
            explosion.update()
            if (explosion.collided)
                this.explosions.splice(index, 1)
        })

        this.colliders.forEach(a => this.colliders.forEach(b => this.checkCollides(a, b)))
        this.invaders.forEach(invader => {
            if (invader.collided) {
                this.explosions.push(Explosion.explode({position: invader.position}))
            }
        })

        this.score += this.colliders.filter(c => !(c instanceof Player)).filter(c => c.collided).length
        this.clean()
        this.colliders = []
        this.colliders.push(this.player)
        this.colliders.push(...this.projectiles)
        this.colliders.push(...this.invaders)

        document.getElementById('score').innerText = this.score
        document.getElementById('colliders').innerText = this.colliders.length
        document.getElementById('stars').innerText = this.background.positions.length
        if (this.player.collided) {
            this.explosions.push(new Explosion({position: this.player.position, color: 'red'}))
            this.gameover = true
            document.getElementById('state').innerText = 'Game Over Press R to restart'
        }
    }

    get invaders() {
        return this.grids.reduce((acc, grid) => acc.concat(grid.invaders), [])
    }

    checkCollides(a, b) {
        if (a.collided || b.collided) {
            return
        }

        a.collidesWith(b)
    }

    clean() {
        this.projectiles.forEach((projectile, index) => {
            if (projectile.collided)
                this.projectiles.splice(index, 1)
            if (projectile.position.y < 0) {
                this.projectiles.splice(index, 1)
            }
        })
        this.grids.forEach((grid, index) => {
            grid.clean()
            if (grid.collided)
                this.grids.splice(index, 1)
            if (grid.position.y > canvas.height)
                this.grids.splice(index, 1)
        })
    }
    processKeys() {

        if (keys.r.pressed && this.gameover) {
            this.start()
            document.getElementById('state').innerText = ''
        }

        if (keys.a.pressed && this.player.position.x >= 0) {
            this.player.velocity.x = -7
            this.player.rotation = -.15
        } else if (keys.d.pressed && this.player.position.x + this.player.width <= canvas.width) {
            this.player.velocity.x = 7
            this.player.rotation = .15
        } else {
            this.player.velocity.x = 0
            this.player.rotation = 0
        }

        if (keys.w.pressed) {
            this.player.velocity.y = -7
        } else if (keys.s.pressed) {
            this.player.velocity.y = 7
        } else {
            this.player.velocity.y = 0
        }

        if (keys.mouse.pressed) {
            const dx = keys.mouse.offsetX - this.player.position.x - (this.player.width / 2)
            const dy = keys.mouse.offsetY - this.player.position.y + 20
            const rotation = dx > 0 ? .15: -.15
            const multiplier = .07

            if (Math.abs(dx) > 5) {
                this.player.velocity.x = dx * multiplier
                this.player.rotation = rotation
            } else {
                this.player.velocity.x = 0
                this.player.rotation = 0
            }

            if (Math.abs(dy) > 5) {
                this.player.velocity.y = dy * multiplier
            } else {
                this.player.velocity.y = 0
            }
        }
        if (keys.space.pressed) {
            if (keys.space.count < 1 || !this.projectiles.length) {
                this.projectiles.push(
                    new Projectile({
                        position: this.player.nozzlePosition,
                        velocity: {x: 0, y: -15}
                    })
                )
                keys.space.count++
            }
        }
        if (!keys.space.pressed) {
            keys.space.count = 0
        }

        if (this.frames % this.randomInterval === 0) {
            this.grids.push(new Grid())
            this.frames = 0
            this.randomInterval = Math.floor(Math.random() * 500 + 500)
        }
        this.frames++
    }
}