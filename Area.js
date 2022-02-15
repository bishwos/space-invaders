export class Area {
    constructor({top, bottom}) {
        this.topLeft = top
        this.bottomRight = bottom
    }
    get top() {
        return this.topLeft.y
    }

    get bottom() {
        return this.bottomRight.y
    }

    get left() {
        return this.topLeft.x
    }

    get right() {
        return this.bottomRight.x
    }

    //TODO: better collision detection
    collidesWith({area}) {
        const a = this
        const b = area
        return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top
    }
}