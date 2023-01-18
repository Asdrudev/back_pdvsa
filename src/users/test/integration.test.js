const { it, describe } = require('mocha')
const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../../app').app

chai.use(chaiHttp)

describe('suite de test de integracion de usuarios', () => {
    it('should return 200 when i get my own user with my credentials', (done) => {
        chai.request(app)
            .get('/api/v1/users/me')
            .set('Authorization', 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZhZmE0MzA0LWNjMjAtNDRhNC1hN2EwLWY2OTJmZWFmYjI2NiIsImVtYWlsIjoiZXhhbXBsZUBleGFtcGxlLmNvbSIsInJvbCI6ImFkbWluIiwiaWF0IjoxNjYxMjgxMTA5fQ.RyfFWdmpzdfzsdZhCp7eiPYRuC1TMjmo_I5nUHDkcQY')
            .end((err, res) => {
                chai.assert.equal(res.status, 200)
                done()
            })
    })
    it('Should return 204 when i delete my own user with my credentials', (done) => {
        chai.request(app)
            .delete('/api/v1/users/me')
            .set('Authorization', 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZhZmE0MzA0LWNjMjAtNDRhNC1hN2EwLWY2OTJmZWFmYjI2NiIsImVtYWlsIjoiZXhhbXBsZUBleGFtcGxlLmNvbSIsInJvbCI6ImFkbWluIiwiaWF0IjoxNjYxMjgxMTA5fQ.RyfFWdmpzdfzsdZhCp7eiPYRuC1TMjmo_I5nUHDkcQY')
            .end((err, res) => {
                chai.assert.equal(res.status, 204)
                done()
            })
    })

})