const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const inputColor = document.querySelector(".input__color")
const tools = document.querySelectorAll(".button__tool")
const sizeButtons = document.querySelectorAll(".button__size")
const buttonClear = document.querySelector(".button__clear")

const customCursor = document.querySelector('#custom-cursor');
const customCursorSvg = document.querySelector('#custom-cursor svg');

let brushSize = 20
let isPainting = false
let activeTool = "brush"
let xAdjust = 10
let yAdjust = 10

inputColor.addEventListener("change", ({ target }) => {
    ctx.fillStyle = target.value
    customCursorSvg.style.fill = target.value;
})

canvas.addEventListener("mousedown", ({ clientX, clientY }) => {
    isPainting = true
    
    if (activeTool == "brush") {
        draw(clientX, clientY)
    }

    if (activeTool == "rubber") {
        erase(clientX, clientY)
    }
})

canvas.addEventListener("mousemove", ({ clientX, clientY }) => {

    customCursor.style.left = clientX + 'px';
    customCursor.style.top = clientY + 'px';

    if (isPainting) {
        if (activeTool == "brush") {
            draw(clientX, clientY)
        }

        if (activeTool == "rubber") {
            erase(clientX, clientY)
        }
    }
})

canvas.addEventListener("mouseup", ({ clientX, clientY }) => {
    isPainting = false
})

const draw = (x, y) => {
    ctx.globalCompositeOperation = "source-over"
    ctx.beginPath()

    ctx.arc(
        x - canvas.offsetLeft + xAdjust, 
        y - canvas.offsetTop + yAdjust,
        brushSize / 2,
        0,
        2*Math.PI
    )
    
    ctx.fill()
}

const erase = (x, y) => {
    ctx.globalCompositeOperation = "destination-out"
    ctx.beginPath()
    ctx.arc(
        x - canvas.offsetLeft, 
        y - canvas.offsetTop,
        brushSize / 2,
        0,
        2*Math.PI 
    )
    ctx.fill()
}

const selectTool = ({ target }) => {
    const selectedTool = target.closest("button")
    const action = selectedTool.getAttribute("data-action")
    
    if (action) {
        tools.forEach((tool) => tool.classList.remove("active"))

        activeTool = action
        selectedTool.classList.add("active")
    }
}



const selectSize = ({ target }) => {
    const selectedTool = target.closest("button")
    const size = selectedTool.getAttribute("data-size")
    
    sizeButtons.forEach((sizeButton) => sizeButton.classList.remove("active"))
    selectedTool.classList.add("active")
    brushSize = size
    customCursorSvg.style.width = size;

    if (size == 5) {
        xAdjust = 2.5
        yAdjust = 11.5
    } else if (size == 10) {
        xAdjust = 5
        yAdjust = 9
    } else {
        xAdjust = size / 2
        yAdjust = size / 2
    }
    
}

tools.forEach((tool) => {
    tool.addEventListener("click", selectTool)
});

sizeButtons.forEach((tool) => {
    tool.addEventListener("click", selectSize)
});

buttonClear.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

