const { create } = require('../controllers/user.controller')
const { Router } = require('express')


class UserRouter{
    routesFromUser() {
        const userRoutes = Router()
        userRoutes.post('/users', create)
        return userRoutes
    }
}

module.exports = new UserRouter()