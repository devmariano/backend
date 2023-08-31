//exemplo de separar o controller em mais camadas. O controler faz o tratamento de erros. o serviço agrega o codigo que é repetido
//
const {User} = require ("../models/User")

class UserService {
    async update(userId, {name,email,password}){
        console.log(userId)
        const dataForUpdate = Object.assign({},
            email && {email},
            name && {name},
            password && {password}
            //só atualiza se tiver exe se tem nome atualiza nome, senão passa para o proximo
            )
            await User.update(
                dataForUpdate,
                {where: {userId}, individualHooks: true}
            )
    }
}

module.exports = new UserService()