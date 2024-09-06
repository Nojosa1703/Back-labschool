const { response, request } = require('express')
const alunoService = require('../services/AlunoService')


module.exports = {
    findAllAlunos: async (request, response) => {
        let json = { error: "", result: [] }

        let alunos = await alunoService.getAluno()

        for (let aluno of alunos) {
            json.result.push({
                id: aluno.id,
                nome: aluno.nome,
                telefone: aluno.telefone,
                email: aluno.email
            })
        }
        response.status(200).json(json)
    },
    deleteAluno: async (request, response) => {
        let json = { error: "", result: {} }

        let id = request.params.id

        if (id) {
            let alunoValid = await alunoService.getAlunoById(id)

            if (alunoValid.length == 0) {
                json.error = "Aluno não encontrado"
                response.status(404).json(json)
            } else {
                await AlunoService.deleteAluno(id)
                json.result = `Aluno ${alunoValid[0].nome} excluído com sucesso`
                response.status(200).json(json)
            }
        } else {
            json.error = "Id do aluno é obrigatório"
            response.status(400).json(json)
        }
    },
    findAlunoById: async (request, response) => {
        let json = { error: "", result: {} }

        let id = request.params.id

        if (id) {
            let alunoValid = await alunoService.getAlunoById(id)


            if (alunoValid.length == 0) {
                json.error = "Aluno não encontrado"
                response.status(404).json(json)
            } else {
                const aluno = alunoValid[0]
                json.result = {
                    id: aluno.id,
                    nome: aluno.nome,
                    telefone: aluno.telefone,
                    email: aluno.email
                }
                response.status(200).json(json)
            }
        } else {
            json.error = "Id do aluno é obrigatório"
            response.status(400).json(json)
        }
    },

    //Método para cadastrar um aluno

    saveAluno: async (request, response) => {
        let json = { error: "", result: "" }

        let foto = request.file.buffer
        let nome = request.body.nome
        let telefone = request.body.telefone
        let data_nascimento = request.body.data_nascimento
        let email = request.body.email
        let curso = request.body.curso

        let aluno = await alunoService.createAluno(foto, nome, telefone, email, data_nascimento, curso)

        json.result = `Aluno: ${nome} cadastrado com sucesso! ID: {${aluno.insertId}}`
        response.status(201).json(json)
    },
    //Método para atualizar um aluno
    updateAluno: async (request, response) => {
        let json = {error: "", result: ""}

        let id = request.params.id

        let foto = request.file.buffer
        let nome = request.body.nome
        let telefone = request.body.telefone
        let data_nascimento = request.body.data_nascimento
        let email = request.body.email

        if (id) {
            let alunoValid = await alunoService.getAlunoById(id)


            if (alunoValid.length == 0) {
                json.error = "Aluno não encontrado"
                response.status(404).json(json)
            } else {
                const aluno = alunoValid[0]
                json.result = {
                    id: aluno.id,
                    nome: aluno.nome,
                    telefone: aluno.telefone,
                    email: aluno.email
                }
                response.status(200).json(json)
            }
        } else {
            json.error = "Id do aluno é obrigatório"
            response.status(400).json(json)
        }

        if(nome != "" && telefone != "" && data_nascimento != "" && email != ""){    

            //Implementar a validação se o id existe no banco de dados

        await alunoService.updateAluno(id, foto, nome, telefone, email, data_nascimento)

        json.result = `Aluno ${nome} atualizado com sucesso! ID: ( ${id})` 
        }else{
            json.error = "Error: Campos obrigátorios não preenchidos"
            response.status(400).json(json)
        }
    }

}