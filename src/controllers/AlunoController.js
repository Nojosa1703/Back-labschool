const { response, request } = require('express')
const alunoService = require('../services/AlunoService')


module.exports = {
    findAllAlunos: async (request, response) => {
        let json = {error: "", result: [] }

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
    let json = {error: "", result: {}}

    let id = request.params.id

    if(id){
        let alunoValid = await alunoService.getAlunoById(id)

        if(alunoValid.length == 0) {
            json.error = "Aluno não encontrado"
                response.status(404).json(json)
        } else{
            await AlunoService.deleteAluno(id)
            json.result = `Aluno ${alunoValid[0].nome} excluído com sucesso`
            response.status(200).json(json)
        }
    }else {
        json.error = "Id do aluno é obrigatório"
        response.status(400).json(json)
    }
},
findAlunoById: async (request,response) => {
    let json = { error: "", result: {} }

    let id = request.params.id
    
    if(id){
        let alunoValid = await alunoService.getAlunoById(id)

        if(alunoValid.length == 0) {
            json.error = "Aluno não encontrado"
            response.status(404).json(json)
        }else{

            json.result ={
                id: aluno.id,
                nome: aluno.nome,
                telefone: aluno.telefone,
                email: aluno.email
            }
            response.status(200).json(json)
        }   
    }else{
        json.error = "Id do aluno é obrigatório"
        response.status(400).json(json)
    }
}
}