const {it, describe} = require('mocha')
const {assert} = require('chai')

const sum = (a,b) => a+b

describe('test unitarios de los usuarios', ()=>{
    it('deberia retornar 8', ()=>{
        const miFuncionEjecutada = sum(6,2)
        assert.equal(miFuncionEjecutada, 8)
    })
})