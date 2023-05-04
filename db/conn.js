const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('pensamentos', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('Conectado com sucesso.')

} catch (error) {
    console.log(`A conexão com Banco de Dados falhou: ${err}`)
}

module.exports = sequelize