const { routesFromUser } = require('./users.routes')

const { Router } = require('express')

const routes = new Router()

routes.use('/api', [
    routesFromUser()
])

module.exports = routes