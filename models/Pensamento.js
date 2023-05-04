const {DataTypes} = require('sequelize')

const db = require('../db/conn')


//User
const User = require('./User')
//-----

const Pensamento = db.define('Pensamento', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
    },
})

Pensamento.belongsTo(User)
User.hasMany(Pensamento)

module.exports = Pensamento