const { create, findAll, findOne } = require('../controllers/user.controller')
const { Router } = require('express')
const {auth} = require('../middlewares/auth')
const {logger} = require('../middlewares/logger')


class UserRouter{
    routesFromUser() {
        const userRoutes = Router()
        userRoutes.post('/users', create)
        userRoutes.get('/users', auth, findAll)
        userRoutes.get('/users/:userId', auth, logger, findOne)
        return userRoutes
    }
}

module.exports = new UserRouter()