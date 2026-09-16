import {baseUrl} from "./con.js";
export default function handleReadMemory(callback){
    fetch(`${baseUrl}/blocks?id=${id}`)
        .then(response => response.json())
        .then(json => callback(json))
}
