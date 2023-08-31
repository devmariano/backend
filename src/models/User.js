const { INTEGER, STRING } = require('sequelize')
const { connection } = require('../database/connection')
const { Cart } = require('../models/Cart')

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
}, {undescored: true, paranoid: true })

Cart.belongsTo(User, {foreignKey : 'userId'})
//um usuario possui varios carrrinhos 
User.hasMany(Cart,{foreignKey : 'userId'})

module.exports = { User }