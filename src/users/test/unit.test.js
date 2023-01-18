const { it, describe } = require('mocha')
const { assert } = require('chai')

const usersControllers = require('../users.controllers')

describe('test unitarios de usuarios', () => {
    it('shod return new users when i sent correct data', (done) => {

        const body = {
            "first_name": "usuario de test",
            "last_name": "tester",
            "email": "test@academlo.com",
            "password": "1234",
            "phone": "6532354",
            "birthday_date": "22/10/2000",
            "country": "venezuela",
        }
        const data = usersControllers.createUsers(body)

        assert.equal(data.first_name, body.first_name)
        assert.equal(data.rol, 'normal')
        assert.notEqual(data.password, body.password)
        assert.equal(data.profile_image, '')
        done()
    })
    it('shod return new users when i sent correct data whit optional inputs', (done) => {

        const body = {
            "first_name": "usuario de test",
            "last_name": "tester",
            "email": "test@academlo.com",
            "password": "1234",
            "phone": "6532354",
            "birthday_date": "22/10/2000",
            "country": "venezuela",
            "profile_image": "asd"
        }
        const data = usersControllers.createUsers(body)

        assert.equal(data.first_name, body.first_name)
        assert.equal(data.rol, 'normal')
        assert.notEqual(data.password, body.password)
        assert.equal(data.profile_image, "asd")
        done()
    })
    it('shod return users by id when i sent correct data', (done) => {
        const data = usersControllers.getUsersById('fafa4304-cc20-44a4-a7a0-f692feafb266')

        assert.property(data, 'id')
        assert.property(data, 'email')
        assert.property(data, 'rol')
        assert.property(data, 'first_name')
        assert.property(data, 'last_name')
        assert.equal(data.rol, 'admin')
        done()
    })
})