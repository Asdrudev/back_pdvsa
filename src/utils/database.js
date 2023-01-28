const {Sequelize} = require('sequelize')

const db = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'root',
    database: 'pdvsa',
    port: 5432
})

module.exports = {
    db
}