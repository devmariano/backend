const bcrypt = require('bcrypt')

function encryptedPassword(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8))
}

module.exports = {encryptedPassword}