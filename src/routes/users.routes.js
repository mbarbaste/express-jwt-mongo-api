const { Router} = require("express")
const users = require("../controllers/users.controller")

const authorize = require('../auth/auth')

const routerUsers = Router()

routerUsers.get('/', authorize, users.list)
routerUsers.get('/deactivated', users.deactivated)
routerUsers.get('/:id', users.getOne)
routerUsers.delete('/:id', users.delete) 
routerUsers.post('/', authorize, users.create)
routerUsers.post('/login', users.login)
routerUsers.put('/:id', users.update)
routerUsers.delete('/activate/:id', users.activate) 

module.exports = routerUsers