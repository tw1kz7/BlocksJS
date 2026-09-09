import colorInvert from "./colorInvert.js";
import handleWriteMemory from "./handleWriteMemory.js";

export default function renderBlock(blockPayload, blocksState) { //функція рендерить блоки коли натискається кнопка Generate
    let block = document.createElement("div")
    const {width, height, color, top, left} = blockPayload

    block.style.width = width + "px"
    block.style.height = height + "px"
    block.style.backgroundColor = color
    block.style.top = top + "px"
    block.style.left = left + "px"
    //mainBlock.append(block)

    const deleteButton = document.createElement("button")
    deleteButton.innerText = "❌"
    deleteButton.style.background = colorInvert(color)
    block.append(deleteButton)
    deleteButton.onclick = function() {
        block.remove()

        for (let index in blocksState){
            if (blocksState[index] === blockPayload){
                blocksState.splice(index, 1) // Видалення блоку з памʼяті за параметрами у blockPayload
            }
        }
        localStorage.setItem("blocks", JSON.stringify(blocksState))
    }

    const buttons = [ //DRY - Don't repeat yourself
        {
            innerText: "^",
            left: "50%",
            top: "-30%",
            transform: "translateX(-50%)",

            click() {
                blockPayload.top--
                block.style.top = blockPayload.top + "px"
                handleWriteMemory(blocksState)
            }
        },

        {
            innerText: "<",
            left: "-30%",
            top: "50%",
            transform: "translateY(-50%)",

            click() {
                blockPayload.left--
                block.style.left = blockPayload.left + "px"
                handleWriteMemory(blocksState)
            }
        },

        {
            innerText: ">",
            left: "110%",
            top: "50%",
            transform: "translateY(-50%)",

            click() {
                blockPayload.left++
                block.style.left = blockPayload.left + "px"
                handleWriteMemory(blocksState)
            }
        },

        {
            innerText: "v",
            left: "50%",
            top: "110%",
            transform: "translateX(-50%)",

            click(){
                blockPayload.top++
                block.style.top = blockPayload.top + "px"
                handleWriteMemory(blocksState)
            }
        }
    ]

    for (let button of buttons) {
        const moveButton = document.createElement("button")
        moveButton.innerText = button.innerText
        moveButton.style.position = "absolute"
        moveButton.style.left = button.left
        moveButton.style.top = button.top
        moveButton.style.background = colorInvert(color)
        block.append(moveButton)
        moveButton.style.transform = button.transform

        moveButton.onclick = button.click
    }


    block.onclick = function() {
        console.log(blockPayload)
    }

    return block
}
