export class Collidable {
    constructor() {
    }
}
Collidable.prototype.collidesWith = function (b) {
    if (Object.is(this, b)) {
        return
    }
    if (this.area.collidesWith({ area: b.area})) {
        this.doCollision()
        b.doCollision()
    }
    return this.collided
}

Collidable.prototype.doCollision = function () {
    if (this.type > 0) {
        this.type--
    } else {
        this.collided  = true
    }
}