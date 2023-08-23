const {config} = require ('dotenv')
const {verify} = require ('jsonwebtoken')
config()

async function logger(req, res, next){
    console.log('precisamos implementar um sistema de logs')
    next();
}


module.exports = {logger}