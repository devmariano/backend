const { INTEGER, FLOAT, BOOLEAN } = require('sequelize')
const { connection } = require('../database/connection')
const { Product } = require('../models/Product')
const { ProductCart } = require('../models/ProductCart')

const Cart = connection.define('carts', {
    cartId:  {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: INTEGER,
        references: {
            model: {
                tableName: 'users'
            }
        }
    },
    price: {
        type: FLOAT,
        allowNull: false
    },
    status: {
        type: BOOLEAN
    }
}, {undescored: true, paranoid: true })

//relacionamento muitos para muitos : 1 produto pertence a muitos carrinhos e 1 carrinho pertence a muitos produtos
//para ajudar o sequelize a fazer a relação é informado a tabela auxiliar productCart e suas chaves estrangeiras
Product.belongsToMany(Cart, { through: ProductCart, foreignKey: 'productId', as: 'carts' });
Cart.belongsToMany(Product, { through: ProductCart, foreignKey: 'cartId', as: 'products' });
//sempre começa pela relação belongsto belongstoMany etc indicando item1.contem1oumuitosdo(item2)
//through serve para indicar a tabela auxiliar para o sequelize
//foreignKey: indica qual a chave estrangeira é contida na tabela auxiliar para realizar a ligação

//hasMany é padrão pois permite que no controler seja adicionada e controlada pelo sequelize as funcoes addproduct e removeproduct do cart por exemplo
ProductCart.hasMany(Cart, {foreignKey: 'cartId'})

module.exports = { Cart }