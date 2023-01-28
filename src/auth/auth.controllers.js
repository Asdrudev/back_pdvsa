const {getUserByCI} = require('../users/users.controllers')
const { comparePassword } = require('../utils/crypt')

const loginUser = async (ci, password) => {
    return await getUserByCI(ci)
    .then(response => {
            const verify_password = comparePassword(password, response.password)
            if(verify_password){
                return response
            }
        return false
    } )
   
}

module.exports = {
    loginUser
}