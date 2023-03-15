'use strict'

const { User } = require('../db.js');

function signUp(req,res) {
    const user = new User()
}

function signIn(req,res) {

}

module.exports = {signIn, signUp}