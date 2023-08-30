const { INTEGER, STRING, FLOAT } = require('sequelize')
const { connection } = require('../database/connection')

const ProductCart = connection.define('productCarts', {
    cartId:  {
        type: INTEGER,
        references: {
            model: {
                tableName: 'carts'
            }
        }
    },
    productId:  {
        type: INTEGER,
        references: {
            model: {
                tableName: 'products'
            }
        }
    }
},{undescored: true, paranoid: true })

module.exports = { ProductCart }