require('dotenv').config()

const express = require('express')
const app = express()
const session = require('express-session')
const cors = require('cors')
const corsOptions = {
    origin: "*",
    credentials: true
}
const port = 3000
const MongoStore = require('connect-mongo')
const uri = process.env.ATLAS_URI
const store = MongoStore.create({
    mongoUrl: uri,
    dbName: 'sessions',
    collectionName: 'sessions'
})
const path = require('path')

app.use(cors(corsOptions))

app.use(session({
    secret: 'test',
    store: store,
    saveUninitialized: false,
    resave: false
}))

app.use(express.static('public'))

app.get('/login', function(req, res){
    req.session.userID = 1
    console.log(req.session.id)
    res.send(req.session.sessionID);
})

app.get('/logout', function(req,res){
    console.log(req.session.id)
    console.log(req.session.userID)
    req.session.destroy(function(err){
        if(err){
            console.log(err)
        }else{
            res.send({message: `deleted ${req.session}` })
        }
    })
})

app.get("/me", (req, res) =>{
    if(req.session.userID){
        res.send({message: true})
    }else{
        res.send({message: false})
    }
})

app.get('/home', (req, res) =>{
    res.sendFile(path.join(__dirname, 'index.html'))
})
app.listen(port, () =>{
    console.log(`app running on port ${port}`)
})