const { User } = require('../models/User')

class UserController {
    async create(req, res) {
        try {
            const {
                name,
                email,
                password
            } = req.body

            const userCreated = await User.create({
                name,
                email,
                password
            })

            return res.status(201).send(userCreated)
        } catch (error) {
            return res.status(400).send({
                message: "Erro na criação de usuário",
                cause: error.message
            })
        }
    }
}

module.exports = new UserController()