require('dotenv').config()

const express = require('express')
const app = express()
const session = require('express-session')
const cors = require('cors')
const corsOptions = {
    origin: "*"
}
const port = 3000
const MongoDbStore = require('connect-mongodb-session')(session);
const uri = process.env.ATLAS_URI
const store = new MongoDbStore(
    {
        uri: uri,
        databaseName: 'sessions',
        collection: 'sessions'
    },
    function(error){
        console.error("error", error)
    });

store.on('error', function(error){
    console.error('error', error)
})

app.use(cors(corsOptions))


app.get("/", (req, res) =>{
    res.send({message: "connected"})
})

app.listen(port, () =>{
    console.log(`app running on port ${port}`)
})