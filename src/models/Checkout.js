const { INTEGER, STRING } = require('sequelize')
const { connection } = require('../database/connection')
const { Cart } = require('../models/Cart')

const Checkout = connection.define('checkouts', {
    checkoutId:  {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cartId:  {
        type: INTEGER,
        references: {
            model:{
                tableName: 'carts'
            }
        }
    },

}, {undescored: true, paranoid: true })

Checkout.belongsTo(Cart, {foreignKey: 'cartId'})
//a tabela de carrinho pertence a 1 checkout e a relação é cart id
Cart.belongsTo(Checkout, {foreignKey : 'cartId'})


module.exports = { Checkout }