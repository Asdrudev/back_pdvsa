
const e = require('express')
const { restart } = require('nodemon')
const userControllers = require('../users/users.controllers')

const getAll = (req, res) => {
    const data = userControllers.getAllUsers()
        .then(response => {
            res.status(200).json({items: response.length, users: response})
        })
        .catch(err => {
            res.status(400).json(err)
        })
   
}

const getUsersById = (req,res) =>{
    const id = req.params.id
    userControllers.getUsersById(id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(404).json({message: `El usuario con el id ${id} no existe`})
        })
}
const register = (req, res)=> {
    const body = req.body
    if(!body){
        return res.status(400).json({message: 'Missing data'})
    }
    else if(
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.password ||
        !body.birthday_date ||
        !body.country
    ){
        return res.status(400).json({message: 'All fields must be completed', fields:{
            first_name: 'string',
            last_name: 'string',
            email: 'example@example.com',
            password: 'string',
            birthday_date: 'YYYY/MM/DD',
            country: 'string'
        } })
    }else{
        userControllers.createUsers(body)
        .then(response => {
            return res.status(201).json({message: `User created succesfully wuth id: ${response.id}`, user: response})
        })
        .catch(err => {
            res.status(400).json({message: err})
        })
        
    }
}

const remove = (req,res)=>{
    const id = req.params.id
    userControllers.deleteUser(id)
    .then(response => {
        if(response){
            return res.status(204).json({message: 'delete sucessfully'})
        }else{
            return res.status(400).json({message: 'invalid id'})
        }
    })
}

const edit = (req, res) => {
    const id = req.params.id
    const data = req.body

    if(!Object.keys(data)){
        return res.status(400).json({message: 'Missing data'})
    }else if (
        !data.first_name ||
        !data.last_name ||
        !data.email ||
        !data.phone ||
        !data.rol ||
        !data.profile_image ||
        !data.birthday_date ||
        !data.country ||
        !data.is_active){
            return res.status(400).json({message: 'All fields must be completed', fields:{
                first_name: 'string',
                last_name: 'string',
                email: 'example@example.com',
                phone: '+5804241333286',
                rol: 'string',
                profile_image: 'example.com/img/example.png',
                birthday_date: 'DD/MM/YYYY',
                country: 'string',
                is_active: 'boolean'
            } })
    } else {
        const response = userControllers.updateUser(id, data)
        return res.status(200).json({message: 'User edit succesfully', user: response})
    }
}

const editMyUser = (req, res) => {
    const id = req.user.id
    const data = req.body
    if(!Object.keys(data)){
        return res.status(400).json({message: 'Missing data'})
    }else if (
        !data.first_name ||
        !data.last_name ||
        !data.email ||
        !data.phone ||
        !data.profile_image ||
        !data.birthday_date ||
        !data.country ||
        !data.is_active){
            return res.status(400).json({message: 'All fields must be completed', fields:{
                first_name: 'string',
                last_name: 'string',
                email: 'example@example.com',
                phone: '+5804241333286',
                profile_image: 'example.com/img/example.png',
                birthday_date: 'DD/MM/YYYY',
                country: 'string',
                is_active: 'boolean'
            } })
    } else {
        const response = userControllers.updateUser(id, data, req.users.rol)
        return res.status(200).json({message: 'User edit succesfully', user: response})
    }
}

const deleteMyUser = (req, res) => {
    const id = req.user.id
    const data = userControllers.deleteUser(id)
    if(data){
        return res.status(204).json(data)
    }else{
        return res.status(400).json({message: 'Invalid Id'})
    }
}

const getMyUser = (req, res) => {
    const id = req.user.id
    const data = userControllers.getUsersById(id)
    if(data){
        res.status(200).json(data)
    }else{
        res.status(404).json({message: `El usuario con el id ${id} no existe`})
    }
}

const postProfileImg = (req,res) => {
    const userId = req.user.id
    const imgPath = req.hostname + ':8000' + '/api/v1/uploads/' + req.file.filename

    const data = userControllers.editprofileImage(userId, imgPath)
    if(data){
        res.status(200).json(data)
    }else{
        return restart.status(400).json({message: 'error'})
    }
}

module.exports = {
    getAll,
    getUsersById,
    register,
    remove,
    edit,
    editMyUser,
    deleteMyUser,
    getMyUser,
    postProfileImg
}