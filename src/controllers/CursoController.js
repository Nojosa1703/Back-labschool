const { response, request } = require('express')
const cursoService = require('../services/CursoService')

module.exports = {
    //metodo para consultar as turmas
    findAllTurmas: async (request, response) => {
        //declaracão do objeto json que será retornado como resposta da requisição
        let json = { error: "", result: [] }

        //invocar a função que ira consultar o BD para listar as turmas
        let cursos = await cursoService.readCursos()

        //tratamento de dados
        for (let curso of cursos) {
            json.result.push({
                id: curso.id,
                nome: curso.nome,
                quantidade: curso.quantidade
            })
        }

        response.status(200).json(json)
    },

    //Método para cadastrar um curso
    saveCurso: async (request, response) => {
        let json = { error: "", result: {} }

        //RECEBER DADOS VIA CORPO DA REQUISIÇÃO PARA CADASTRAR O CURSO 
        let nome = request.body.nomeCurso

        if (nome) {
            let curso = await cursoService.createCurso(nome)

            json.result = {
                id: curso.insertId,
                nome: nome
            }
        } else {
            json.error = 'Nome do curso é obrigatório'
        }

        response.status(201).json(json)
    },

    //Método para atualizar um curso
    updateCurso: async (request, response) => {
        let json = { error: "", result: {} }

        //Capturar o id pelo parametro da URI
        let id = request.params.id

        //Capturar o nome e quantidade do curso via corpo da requisição
        let nome = request.body.nome
        let quantidade = request.body.quantidade

        if (id) {
            //Verificar se existe algum curso associado ao ID
            let cursoValid = await cursoService.findCursoById(id)

            if (cursoValid.length == 0) {
                json.error = "Curso não encontrado"
                response.status(404).json(json)
            } else {
                await cursoService.updateCurso(id, nome, quantidade)
                json.result = {
                    id: id,
                    nome: nome,
                    quantidade: quantidade
                }
                response.status(200).json(json)
            }

        } else {
            json.error = "Id do curso é obrigatório"
            response.status(400).json(json)
        }
    },

    //Método para deletar um curso
    deleteCurso: async (request, response) => {
        let json = { error: "", result: {} }

        let id = request.params.id

        if(id) {
            let cursoValid = await cursoService.findCursoById(id)

            if (cursoValid.length == 0) {
                json.error = "Curso não encontrado"
                response.status(404).json(json)
            } else {
                await cursoService.deleteCurso(id)
                json.result = `Curso ${cursoValid[0].nome} excluído com sucesso`
                response.status(200).json(json)
            }
        } else {
            json.error = "Id do curso é obrigatório"
            response.status(400).json(json)
        }
    }
}
