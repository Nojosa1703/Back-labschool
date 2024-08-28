const cursoService = require('../services/CursoService')

module.exports = {
    //metodo para consultar as turmas
    findAllTurmas: async(request, response) => {
        //declaracão do objeto json que será retornado como resposta da requisição
        let json = {error: "", result:[]}

        //invocar a função que ira consultar o BD para listar as turmas
        let cursos = await cursoService.readCursos()

        //tratamento de dados
        for(let curso of cursos){
            json.result.push({
                id: curso.id,
                nome: curso.nome,
                quantidade: curso.quantidade
            })
        }

        response.status(200).json(json)
    }
}