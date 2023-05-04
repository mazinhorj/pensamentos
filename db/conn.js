require('dotenv').config();
const { Sequelize } = require('sequelize')


const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbDb = process.env.DB_DB;
const dbDialect = process.env.DB_DIALECT;

const sequelize = new Sequelize(dbDb, dbUser, dbPass, {
    host: dbHost,
    dialect: dbDialect
})

try {
    sequelize.authenticate()
    console.log('Conexão com banco de dados com sucesso.')

} catch (error) {
    console.log(`A conexão com Banco de Dados falhou: ${err}`)
}

module.exports = sequelize