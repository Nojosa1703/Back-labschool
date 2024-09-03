const express = require('express')
const route = express.Router()
const cors = require('cors')
const cursoController = require('./controllers/CursoController')

route.options("*", cors())

//Endpoint - Curso
route.get('/curso', cursoController.findAllTurmas) //READY
route.post('/curso', cursoController.saveCurso) //CREATE
route.put('/curso/:id', cursoController.updateCurso) //UPDATE
route.delete('/curso/:id', cursoController.deleteCurso) //DELETE

module.exports = route