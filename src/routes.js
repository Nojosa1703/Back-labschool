const express = require('express')
const route = express.Router()
const cors = require('cors')
const cursoController = require('./controllers/CursoController')
const alunoController = require('./controllers/alunoController')

route.options("*", cors())

//Endpoint - Curso
route.get('/curso', cursoController.findAllTurmas) //READY
route.post('/curso', cursoController.saveCurso) //CREATE
route.put('/curso/:id', cursoController.updateCurso) //UPDATE
route.delete('/curso/:id', cursoController.deleteCurso) //DELETE


//Endpoint - Aluno

route.get('/aluno', alunoController.findAllAlunos) //READY
route.delete('/aluno/:id', alunoController.deleteAluno) //DELETE
route.get('/aluno/:id', alunoController.findAlunoById) //FIND


module.exports = route