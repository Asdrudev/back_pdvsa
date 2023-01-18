/*
{
        "id": "fafa4304-cc20-44a4-a7a0-f692feafb266",
        "first_name": "string",
        "last_name": "string",
        "email": "example@example.com",
        "password": "$2b$10$iXA47IOGFgFyVBm1yNbUmOAkVeoVYwGsdpJmS3iLJrt5N.ZFDbSBO",
        "phone": "",
        "birthday_date": "DD/MM/YYYY",
        "rol": "admin",
        "profile_image": "",
        "country": "string",
        "is_active": true,
        "verified": false
    }

*/

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
        type: DataTypes.DOUBLE,
    },
    email: {
        allowNull: false, 
        type: DataTypes.STRING,
    }
})

module.exports = Users
