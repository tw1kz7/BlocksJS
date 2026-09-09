export default async function asyncHandleReadMemory(id) {
    const response = await fetch('http://localhost:3000/blocks?id=' + id)
    console.log(response)
    if (response.ok){
        const json = await response.json()

        return json
    }

    return []
}