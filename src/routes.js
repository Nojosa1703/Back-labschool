const express = require('express')
const route = express.Router()
const cors = require('cors')
const cursoController = require('./controllers/CursoController')

route.options("*", cors())

//Endpoint - Curso
route.get('/curso', cursoController.findAllTurmas) //READY

module.exports = route