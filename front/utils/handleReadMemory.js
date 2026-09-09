export default function handleReadMemory(callback){
    fetch('http://localhost:3000/blocks')
        .then(response => response.json())
        .then(json => callback(json))
}
