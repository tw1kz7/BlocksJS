const express = require("express")
const cors = require("cors")

const {v4} = require("uuid")

const fs = require("fs")

const JSONdb = require('simple-json-db');

const db = new JSONdb('./memory.json');

console.log(v4())

const app = express()

app.use(express.json())

app.use(cors({
    origin: "*"
}))

//let blocksJson = fs.readFileSync("./memory.json", "utf-8")
//let blocks = JSON.parse(blocksJson)
//console.log(blocks)

app.get("/", (req, res)=>{
    console.log("Endpoint was invoked")
    res.send("Hello")
})

app.get("/blocks", (req, res)=>{ //blocks?id=xxxxxxxxxx&user=John
    console.log(req.query)
    let id = req.query.id
    if (db.has(id)){
        res.json(db.get(id))
    } else {
        res.sendStatus(404)
    }
})

app.post("/blocks", (req, res)=>{
    if (Array.isArray(req.body) && req.body.length) {
        const pictureId = v4()
        db.set(pictureId, req.body)
        //blocks[pictureId] = req.body
        //fs.writeFileSync("./memory.json", JSON.stringify(blocks))
        res.status(200).send(pictureId)
    } else {
        res.sendStatus(400) //так як ми оброблюємо декілька помилок то просто статус 400
    }
})

app.listen(3000, ()=>console.log("Server is working"))

//спробувати використати tiny db (https://www.npmjs.com/package/tiny)