const { updateAluno } = require('../controllers/alunoController')
const database = require('../database')

module.exports = {
    getAluno: () => {
        return new Promise((resolve, reject) => {
            database.query('SELECT * FROM aluno', (err, result) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(result)
            })
        })
    },
    getAlunoById: (id) => {
        return new Promise((resolve, reject) => {
            database.query(`SELECT * FROM aluno WHERE id=${id}`, (err, result) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(result)
            })
        })
    },
    deleteAluno: (id) => {
        return new Promise((resolve, reject) => {
            database.query(`DELETE FROM aluno WHERE id=${id}`, (err, result) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(result)
            })
        })
    },
    createAluno: (foto, nome, telefone, email, data_nascimento, curso) => {
return new Promise((resolve,reject) =>{
    database.query(`INSERT INTO aluno VALUES(null, ?, ?, ?, ?, ?, ?)`, [foto, nome, telefone,data_nascimento, curso, email], (err, result) =>{
        if(err){
            reject(err)
                    return 
        }
        resolve(result)
    })
})
    },
    updateAluno: (id, foto, nome, telefone, email, data_nascimento) => {
        return new Promise((resolve, reject) => {
            database.query(
                'UPDATE aluno SET foto = ?, nome = ?, telefone = ?, data_nascimento = ?, email = ? WHERE id = ?',
                [foto, nome, telefone, data_nascimento, email, id],
                (err,result) => {
                    if(err){
                        reject(err)
                        return
                    }
                }
            )
        })
    }
}
