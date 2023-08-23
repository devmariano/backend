const {config} = require ('dotenv')
const {verify} = require ('jsonwebtoken')
config()

async function auth(req, res, next){
    console.log('PAsisei aqu')
    next();
}


module.exports = {auth}