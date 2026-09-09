export default function handleWriteMemory(blocksState) {
    return fetch('http://localhost:3000/blocks',{
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json" //optimistic update
        },
        body: JSON.stringify(blocksState)
    })
        .then(response => response.text())

    //localStorage.setItem("blocks", JSON.stringify(blocksState))

}