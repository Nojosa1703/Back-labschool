const express = require('express')
const route = express.Router()
const cors = require('cors')

route.options("*", cors())

//rota teste

route.get('/test', (req,res)=>{
res.send("Hello world! Seja Bem-Vindo(a) a minha API")
})

module.exports = route