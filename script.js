const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const inputColor = document.querySelector(".input__color")
const tools = document.querySelector(".button__tool")
const sizeButtons = document.querySelector(".button__size")
const buttonClear = document.querySelector(".button__clear")

let brushSize = 10
ctx.fillStyle = "#000"

canvas.addEventListener("mousedown", (event) => {
    const { clientX, clientY } = event
    draw(clientX, clientY)
})

const draw = (x, y) => {

    ctx.beginPath()

    ctx.arc(
        x - canvas.offsetLeft, 
        y - canvas.offsetTop,
        brushSize,
        0,
        2*Math.PI
    )
    
    ctx.fill()
}

