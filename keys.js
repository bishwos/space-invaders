export const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },
    r: {
        pressed: false
    },
    space: {
        pressed: false,
        count: 0
    },
    mouse: {
        offsetX: 0,
        pressed: false
    }
}
addEventListener('mousemove', ({offsetX, offsetY}) => {
    keys.mouse = {
        offsetX: offsetX,
        offsetY: offsetY,
        pressed: true
    }
})
addEventListener('mousedown', ()=> keys.space.pressed = true)
addEventListener('mouseup', ()=> keys.space.pressed = false)
addEventListener('keydown', ({key}) => {
    switch (key) {
        case 'a':
            keys.a.pressed = true
            keys.mouse.pressed = false
            break
        case 'd':
            keys.d.pressed = true
            keys.mouse.pressed = false
            break
        case 's':
            keys.s.pressed = true
            keys.mouse.pressed = false
            break
        case 'w':
            keys.w.pressed = true
            keys.mouse.pressed = false
            break
        case ' ':
            keys.space.pressed = true
            break
        case 'r':
            keys.r.pressed = true
            keys.mouse.pressed = false
            break
    }
})
addEventListener('keyup', ({key}) => {
    switch (key) {
        case 'a':
            keys.a.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'w':
            keys.w.pressed = false
            break
        case ' ':
            keys.space.pressed = false
            break
        case 'r':
            keys.r.pressed = false
            break
    }
})