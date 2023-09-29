const express = require("express")
const { UserModel } = require("../models/users.model")
const bcrypt = require("bcrypt")
require("dotenv").config()
const jwt = require("jsonwebtoken")
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY



const userRouter = express.Router()


userRouter.post("/register", async (req, res) => {
    const {email} = req.body
    const passwordFromUser = req.body.password

    try {
        const userInDb = await UserModel.findOne({email})
        // console.log(userInDb)

        if(!userInDb) {
            bcrypt.hash(passwordFromUser, 5, async function(err, hash) {
                if (hash) {
                    const user = {...req.body, password: hash}
                    const newUser = new UserModel({...user})
                    await newUser.save()
                    res.status(200).json({"msg": "You have been registered successfully."})
                } else if (err) {
                    res.status(400).json({"err": err.message})
                }
            });
        } else {
            res.status(409).json({"msg": "User with same email already exists."})
        }
        
    } catch (error) {
        res.status(400).json({"err": error.message})
    }
})


userRouter.post("/login", async (req, res) => {
    const {email, password} = req.body
    try {
        const userInDb = await UserModel.findOne({email}) 
        
        if (userInDb) {
            const passwordFromUser = password
            const passwordFromDB = userInDb.password
            const userId = userInDb._id
            bcrypt.compare(passwordFromUser, passwordFromDB, function(err, result) {
                if (result) {
                    const token = jwt.sign({email, userId}, JWT_PRIVATE_KEY);
                    res.status(200).json({"msg": "Login Successful !", token})
                } else if (err) {
                    console.log(err.message)
                    res.status(401).json({"msg": "Wrong Email or Password"})

                }
            });
        } else {
            res.status(401).json({"msg": "Wrong Email or Password"})
        }
    } catch (error) {
        console.log(error.message)
        res.status(400).json({"err": error.message})
    }
})



module.exports = {userRouter}