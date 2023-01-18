const roleAdminMiddleware = (req, res, next) => {
    const rol = req.user.rol
    if(rol === 'admin'){
        next()
    }else{
        return res.status(401).json({status: 'error' ,message: 'user not authorized'})
    }
}

exports.roleAdminMiddleware = roleAdminMiddleware