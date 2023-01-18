const router = require('express').Router()
const passport = require('passport')
const upload = require('../utils/multer').upload
const { roleAdminMiddleware } = require('../middleware/adminRole')
require('../middleware/auth.middleware')(passport)

const userServices = require('./users.http')

router.route('/')
    .get(userServices.getAll)

router.route('/me')
    .put(passport.authenticate('jwt', {session: false}), userServices.editMyUser)
    .get(passport.authenticate('jwt', {session:false}), userServices.getMyUser)
    .delete(passport.authenticate('jwt', {session:false}), userServices.deleteMyUser)

router.route('/me/profile-img')
    .post(passport.authenticate('jwt', {session:false}), upload.single('profile_img'), userServices.postProfileImg)//es para mandar la imagen del perfil
    //.get()

router.route('/:id')
    .get(userServices.getUsersById)
    .put(passport.authenticate('jwt', {session: false}),roleAdminMiddleware ,userServices.edit)
    .delete(passport.authenticate('jwt', {session: false}), roleAdminMiddleware ,userServices.remove)


    
    
exports.router = router