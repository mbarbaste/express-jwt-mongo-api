const User = require('../models/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const saltRounds = 10

exports.list = async (req, res) => {

    try {
        const users = await User.find({active:true}).select({password: false, __v: false})
        //res.json(users)
        res.json({"errors":"0", "msg":"Records Obtained",  "records": users.length, "data": users})
    } catch (error) {
        res.json(error)
    }
}

exports.deactivated = async (req, res) => {
    
    try {
        const users = await User.find({active: false}).select({password: false, __v: false})
        
        res.json({"errors":"0", "msg":"Records Deactivated", "records": users.length, "data": users})
    } catch (error) {
        res.json(error)
    }
}

exports.getOne = async (req, res) => {
    const id = req.params.id
    
    try {
        const users = await User.findById(id).select({password: false, __v: false})
        res.json(users)
    } catch (error) {
        res.json(error)
    }
}

exports.create = async (req, res) => {

    const username = req.body.username
    const email = req.body.email
    const plainPassword = req.body.password
       
    try {       

        if (username && email && plainPassword) {            

            const password = await bcrypt.hash(plainPassword, saltRounds)

            const newUser = new User({
                username,
                email,
                password
            })
            console.log(newUser)
            await newUser.save()

            res.json({"errors":"0", "msg":"Record Created", "data": {"_id": newUser._id, username, email}})
            

        } else {
            res.json({msg: "All data are required."})
        }
       
        
    } catch (error) {
        //res.json(error)
        res.json({"errors":"1", "msg": error})
    }    

    
}

exports.login = async (req, res) => {

    const email = req.body.email
    const plainPassword = req.body.password
       
    try {       

        if (email && plainPassword) {            

            const userExist = await User.findOne({email})
            
            if (userExist) {
                console.log("el usuario existe.", userExist)
                const valid = await bcrypt.compare(plainPassword, userExist.password)

                if( valid ) {
                    // Valid Credentials then Generate a TOKEN
                    const { _id, username, email } = userExist
                    const options = {
                        expiresIn:"1h"
                    }

                    const JWT_SECRET = "palabra-secreta"

                    const token = await jwt.sign({_id, username, email, email}, JWT_SECRET, options)

                    res.json({"errors": "0", token})
                } else {
                    res.json({"errors": "1", msg: "Invalid Credentials."})    
                }

            } else {
                res.json({"errors": "1", msg: "Invalid Credentials."})
            }

        } else {
            res.json({msg: "All data are required."})
        }
       
        
    } catch (error) {
        //res.json(error)
        res.json({"errors":"13", "msg": error})
    }    

    
}

exports.delete = async (req, res) => {
    const id = req.params.id
    
    try {
        const deleted = await User.findByIdAndUpdate(id, {active: false})
        // res.json(deleted)
        res.json({"errors":"0", "msg":"Record Deactivated", "data": {id, "username": deleted.email}})
    } catch (error) {
        res.json({"errors":"1", "msg": error})
    }
}

exports.activate = async (req, res) => {
    const id = req.params.id

    try {
        const activated = await User.findByIdAndUpdate(id, {active: true})
        
        res.json({"errors":"0", "msg":"Record Active", "data": {id, "username": activated.email, "active": activated.active}})
    } catch (error) {
        res.json({"errors":"1", "msg": error})
    }
}

exports.update = async (req, res) => {
    const id = req.params.id
    const data = req.body

    if ( id && data) {
        try {
            const updated = await User.findByIdAndUpdate(id, data)
            //res.json(updated)
            res.json({"errors":"0", "msg":"Record Updated", "data": {id, "username": updated.username}})
        } catch (error) {
            res.json(error)
        }
    } else {
        res.json({msg: "Invalid Data"})
    }    
}
