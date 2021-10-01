const User = require('../models/Users')
const jwt = require('jsonwebtoken')

const authorize = async ( req, res, next) => {
    const strToken = req.headers.authorization

    if(!strToken) {
        return res.json({"errors":"1","msg":"No Token"})
    }

    try {
        const token = strToken.split(" ")[1]
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        console.log(verified)
    
    } catch (error) {
        return res.json({"errors":"1","msg":error})
    }

    

    next()
}

module.exports = authorize