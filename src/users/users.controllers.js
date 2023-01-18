const uuid = require('uuid')
const { hashPassword, comparePassword } = require('../utils/crypt')

const Users = require('../models/users.model')

const userDB = [
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
]

const getAllUsers = async () => {
    const data = await Users.findAll({
        attributes: {
            exclude: ['password']
        }
    })
    return data
    //? select * from users;
}

const getUsersById = async (id) => {
    const data = await Users.findOne({
        where: {
            id: id
        },
        attributes: {
            exclude: ['password']
        }
    })
    return data
    //? select * from users where id = ${id};
}

const createUsers = async (data) => {
    const newUser = await Users.create({
        ...data,
        id: uuid.v4(),
        password: hashPassword(data.password),
        rol: 'normal',
        is_active: true,
        verified: false
    })
    return newUser
}

const deleteUser = async (id) => {
    const data = await Users.destroy({
        where: {
            id
        }
    })
    return data
}

const updateUser = async (userId, data, userRol) => {
    if (userRol === 'admin') {
        const { password, id, verified, ...newData } = data
        const response = await Users.update({
            ...newData
        }, {
            where: {
                id: userId
            }
        })
        return response
    } else {
        const { password, id, verified, role, ...newData } = data
        const response = await Users.update({
            ...newData
        }, {
            where: {
                id: userId
            }
        })
        return response
    }
}

const getUserByEmail = async (email) => {
    const data = await Users.findOne({
        where: {
            email: email
        }
    })
    return data
    //? select * from users where email = ${email};
}

const editprofileImage = async (userId, imgUrl) => {
    const response = await Users.update({
        profile_image: imgUrl
    }, {
        where: {
            id: userId
        }
    })
    return response
}

module.exports = {
    getAllUsers,
    getUsersById,
    createUsers,
    deleteUser,
    updateUser,
    getUserByEmail,
    editprofileImage
}