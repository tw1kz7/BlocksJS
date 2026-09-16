import {baseUrl} from "./con.js";
export default function handleWriteMemory(blocksState) {
    return fetch(`${baseUrl}/blocks`,{
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