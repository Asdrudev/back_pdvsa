const uuid = require('uuid')
const { hashPassword, comparePassword } = require('../utils/crypt')

const Users = require('../models/users.model')

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
        is_active: true
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
        const { password, id, ...newData } = data
        const response = await Users.update({
            ...newData
        }, {
            where: {
                id: userId
            }
        })
        return response
    } else {
        const { password, id, role, ...newData } = data
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

module.exports = {
    getAllUsers,
    getUsersById,
    createUsers,
    deleteUser,
    updateUser,
    getUserByEmail
}