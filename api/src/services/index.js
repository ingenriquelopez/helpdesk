'use strict';

const jwt    = require('jwt-simple');
const moment = require('moment');
const config = require('../')
const SECRET = process.env.SECRET;


function createToken(user) {
    const payload = {
        sub: user.email,
        iat:moment().unix(),
        exp: moment().add(14,'days').unix(),
    }
    return jwt.encode(payload,SECRET);

}

module.exports = {
    createToken,
}