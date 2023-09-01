const { sign } = require('jsonwebtoken')
const { User } = require('../models/User')
const { Cart } = require('../models/Cart')
const bcrypt = require('bcrypt')
const { update } = require('../services/user.services')

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

            if(!user){
                return res.status(404).send({message:`Usuário não encontrado`})
            }

            return res.status(200).send(`Usuário: ${user.email}`)
        } catch (error) {
            return res.status(400).send({
                message: "Erro ao listar o usuário",
                cause: error.message
            })
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body

            const user = await User.findOne({
                where: { email }
            })

            if(!user){
                return res.status(404).send({message: "Usuário não Encontrado!"})
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {

            //if ( user.password === password ) {
                const payload = {
                    userId: user.userId,
                    name: user.name,
                    email: user.email
                }

                const token = sign(payload, process.env.JWT_SECRET, { expiresIn: "1y"})
                return res.status(200).send({token})
            }
            else {
                return res.status(400).send({message: "Senha inválida"})
            }

        } catch (error) {
            return res.status(400).send({
                message: "Erro ao realizar o login do usuário",
                cause: error.message
            })
        }
    }

    async findCarts(req, res) {
        try {
            const { userId } = req.params
            const user = await User.findOne({where: {
                userId:userId
            }, include:
                    [{model: Cart, as: 'carts', key: 'user_id'}]
            })

            if(!user){
                return res.status(404).send({message:`Usuário não encontrado`})
            }

            return res.status(200).send({user})
        } catch (error) {
            return res.status(400).send({
                message: "Erro ao listar o usuário",
                cause: error.message
            })
        }
    }

    async update(req, res) {
        try {
            const { userId } = req.params
            const { name } = req.body

            const user = await User.findByPk(userId)

            if(!user){
                return res.status(404).send({message:`Usuário não encontrado`})
            }

            if(!name){
                return res.status(400).send({message:`Nenhum nome válido para alteração`})
            }

            if(name === user.name){
                return res.status(403).send({message:`Usuário já utiliza este nome`})
            }
            //passou a consumir o service
            await update(userId, {name})
            //await user.update({name:name})
            //return res.status(200).send({name})
            /*await User.update(
                {name}, 
                {where: {userId}
            })*/
            return res.status(204).send()
        } catch (error) {
            return res.status(400).send({
                message: "Erro ao realizar o update do usuário",
                cause: error.message
            })
        }
    }

    async updatePassword(req, res) {
        try{
            const { userId } = req.params
            const { password } = req.body

            const user = await User.findByPk(userId)

            if(!user){
                return res.status(404).send({message:`Usuário não encontrado`})
            }

            const match = bcrypt.compareSync(password, user.password)
            if (match){
                return res.status(400).json({ error: "Usuário ja utiliza esta senha"})
            }

            await update(userId, {password})
            return res.status(204).send()
        } catch (error){
            return res.status(400).send({
                message: "Erro ao realizar o update do usuário",
                cause: error.message
            })
        }
    }
}

module.exports = new UserController()