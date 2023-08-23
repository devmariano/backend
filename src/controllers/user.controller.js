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

    async findAll(req, res) {
        try {
            const users = await User.findAll()

            return res.status(200).send(users)
        } catch (error) {
            return res.status(400).send({
                message: "Erro ao listar todos os usuários",
                cause: error.message
            })
        }
    }

    async findOne(req, res) {
        try {
            const { userId } = req.params
            const user = await User.findByPk(userId)

            return res.status(200).send(user)
        } catch (error) {
            return res.status(400).send({
                message: "Erro ao listar todos os usuários",
                cause: error.message
            })
        }
    }
}

module.exports = new UserController()