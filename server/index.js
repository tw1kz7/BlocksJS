const express = require("express")
const cors = require("cors")
const {v4} = require("uuid")
const dotenv = require("dotenv")

dotenv.config()

const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
const uri = process.env.MONGO_URI // "mongodb+srv://user:user@cluster0.hk0r9og.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

const app = express()

app.use(express.json())

app.use(cors({
    origin: "*"
}))

//let blocksJson = fs.readFileSync("./memory.json", "utf-8")
//let blocks = JSON.parse(blocksJson)
let blocks = {}
//console.log(blocks)

app.get("/", (req, res)=>{
    console.log("Endpoint was invoked")
    res.send("Hello")
})

app.get("/blocks", async (req, res)=>{ //blocks?id=xxxxxxxxxx&user=John
    try {
        const id = req.query.id
        if (id in blocks){
            return blocks[id]
        }
        await client.connect()
        const collection = await client.db("blocks").collection("pictures")
        const result = await collection.findOne({_id: new ObjectId(id)})
        await client.close()
        blocks[id] = result.list
        console.log(result.list)
        res.json(result.list) //так як в result повертається обʼєкт замість масивуто потрібно його перетворити у list
    } catch(error) {
        res.sendStatus(400)
    }
})

app.post("/blocks", async (req, res)=>{
    if (Array.isArray(req.body) && req.body.length) {
        await client.connect();
        const collection = await client.db("blocks").collection("pictures")
        const result = await collection.insertOne({list:req.body})
        await client.close()
        console.log(result)
        //blocks[pictureId] = req.body
        //fs.writeFileSync("./memory.json", JSON.stringify(blocks))
        res.status(200).send(result.insertedId.toString())
    } else {
        res.sendStatus(400) //так як ми оброблюємо декілька помилок то просто статус 400
    }
})

app.listen(3000, ()=>{
    run().catch(console.dir);
    console.log("Server is working")}
)

//cron.schedule('0 6 * * *', () => {
   // blocks = {} - block gets empty every day at 6 am to minimize requests to database
//});
//зробити такий самий request до бази даних mongoDB для get