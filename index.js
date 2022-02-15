import {Game} from "./game.js"

export const canvas = document.querySelector('canvas')
export const c = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight
Math.randomInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

new Game()
