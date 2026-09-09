import handleWriteMemory from "./utils/handleWriteMemory.js";
import asyncHandleReadMemory from "./utils/asyncHandleReadMemory.js";
import handleReadMemory from "./utils/handleReadMemory.js";
import renderBlock from "./utils/renderBlock.js";

const amountInput = document.querySelector("#amount");
const mainBlock = document.querySelector("main");
const colorInput = document.querySelector("#color")
const widthInput = document.querySelector("#width")
const heightInput = document.querySelector("#height")
let addForm = document.querySelector("#form")
const testElement = document.querySelector("#element")

amountInput.style.fontSize = "40px"
let blocksState = [] //зберігає в памʼяті інформацію про блоки у форматі JSON

const searchId = new URL(location.href)
const id = searchId.searchParams.get("id")
//зробити так щоб читання відбувалось з fetch а не з памʼяті (2 способи: синхронний та асинхронний)
if (id) {

    blocksState = await asyncHandleReadMemory(id)
//await asyncHandleReadMemory((json) => {

    // blocksState = json

    const blocks = []

    for (let i = 0; i < blocksState.length; i++) { //замість додавання кожного блоку по одному ми додаємо одразу список з усіх блоків
        const block = renderBlock(blocksState[i], blocksState)
        blocks.push(block)
    }
    mainBlock.append(...blocks)
//})
}

addForm.onsubmit = async function (event){
    event.preventDefault()
    const amount = amountInput.value
    const blocks = []
    for (let i=0 ; i < amount; i++){
        const potentialTop = (Math.random() * window.innerHeight) - heightInput.value
        const potentialLeft = (Math.random() * window.innerWidth) - widthInput.value

        const blockPayload = {
            width: widthInput.value,
            height: heightInput.value,
            color: colorInput.value,
            top: Math.max(0, potentialTop),
            left: Math.max(0, potentialLeft)
        }

        blocksState.push(blockPayload)
        const block = renderBlock(blockPayload, blocksState)
        blocks.push(block)
    }
    mainBlock.append(...blocks)

    let id = await handleWriteMemory(blocksState)

    let link = document.createElement("a")
    link.setAttribute("href", location.origin + location.pathname + "?id=" + id)
    link.innerText = "Url to your image"
    testElement.append(link)
}
    //link - <a> text sample </a>



