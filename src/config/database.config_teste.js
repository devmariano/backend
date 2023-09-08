const { config } = require('dotenv')
config()

module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'senai',
    database: 'ecommerce',
    port: 5432,
    define: {
        underscored: true,
        underscoredAll: true
    }
}
