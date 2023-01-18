const jwt = require('jsonwebtoken')

const { loginUser } = require('../auth/auth.controllers')

const login = (req, res) => {
    const data = req.body;
    if (!data.email || !data.password) {
        return res.status(400).json({ message: 'Missing Data' })
    }else{
        loginUser(data.email, data.password)
        .then(response => {
            if (response) {
                const token = jwt.sign({
                    id: response.id,
                    email: response.email,
                    rol: response.rol
                }, 'academlo')
        
                return res.status(200).json({ message: 'Tus credenciales son correctas', token: token })
            }
            else {
                return res.status(401).json({ message: 'Invalid Credentials' })
            }
        })
    }
}

module.exports = {
    login
}