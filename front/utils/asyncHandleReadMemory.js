import {baseUrl} from "./con.js";
export default async function asyncHandleReadMemory(id) {
    const response = await fetch(`${baseUrl}/blocks?id=${id}`)
    console.log(response)
    if (response.ok){
        const json = await response.json()

        return json
    }

    return []
}