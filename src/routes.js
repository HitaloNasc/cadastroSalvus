const express = require('express')
const routes = express.Router()
const User = require('./controllers/users.controller')


// Users routes
routes.post('/api/users', User.create)
routes.get('/api/users', User.index)
routes.get('/api/users.details/:_id', User.details)
routes.delete('/api/users/:_id', User.delete)
routes.put('/api/users', User.update)
routes.post('/api/users/login', User.login)
routes.get('/api/users/checktocken', User.checkToken)
routes.get('/api/users/destroytoken', User.destroyToken)



module.exports = routes