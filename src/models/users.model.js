const {DataTypes} = require('sequelize')
const {db} = require('../utils/database')

const Users = db.define('users', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false
    },
    first_name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    last_name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            min: 8
        }
    },
    phone: {
        allowNull: false,
        type: DataTypes.STRING
    },
    role: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'normal'
    },
    ci: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    email: {
        allowNull: false, 
        type: DataTypes.STRING,
    }
})

module.exports = Users
