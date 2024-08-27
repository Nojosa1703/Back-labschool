require('dotenv').config({path: 'variaveis.env'})

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./routes.js')

const server = express()

server.use(bodyParser.urlencoded({extended: false}))
server.use(bodyParser.json())
server.use(cors())
server.use("/api", routes)

server.listen('3000', () => {
    console.log("Server listen on http://localhost:3000")
})

