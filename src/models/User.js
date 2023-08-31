const { INTEGER, STRING } = require('sequelize')
const { connection } = require('../database/connection')
const { Cart } = require('../models/Cart')
const { encryptedPassword } = require('../utils/functions')

const User = connection.define('users', {
    userId:  {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: STRING,
        allowNull: false
    },
    email: {
        type: STRING,
        allowNull: false
    },
    password: {
        type: STRING,
        allowNull: false
    }
}, {undescored: true, paranoid: true, hooks:{
    beforeCreate: encryptedPassword,
    beforeUpdate: encryptedPassword
}
})

Cart.belongsTo(User, {foreignKey : 'userId'})
//um usuario possui varios carrrinhos 
User.hasMany(Cart,{foreignKey : 'userId'})

module.exports = { User }