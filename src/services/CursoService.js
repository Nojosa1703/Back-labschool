//IMPORTAÇÃO DO DATABASE

const database = require('../database')

module.exports = {

    //metodo para consultar uma turma/curso
    readCursos: () => {
        return new Promise((resolve, reject) => {
            database.query('select * FROM curso', (err, result) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(result)
            })
        })
    },
    createCurso: (nome) => {
        return new Promise((resolve,reject) => {
            database.query(`INSERT INTO curso VALUES (null, "${nome}", null)`, (err, result) => {
                if(err){
                    reject(err);
                    return
                }
                resolve(result)
            })
        })
    }
}
