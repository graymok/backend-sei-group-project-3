const UserAuth = require('../middleware/UserAuth');
const jwt = require('jsonwebtoken');
const models = require('../models');
const user = require('../models/user');

const userController = {}

userController.signup = async (req,res) =>{
try {
    const newUser = await models.user.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    console.log('user created');
    const encryptId = jwt.sign({userId:newUser.id}, process.env.JWT_SECRET)
    res.json({newUser,userId:encryptId})
} catch (error) {
    console.log(error)
    res.status(400).json({error:error.message})
}

}

userController.login = async (req,res) => {

    try {
        const user = await models.user.findOne({
            where:{email:req.body.email}
        })
        const encryptId = jwt.sign({userId:user.id}, process.env.JWT_SECRET)
        if
        (user.verifyPassword(req.body.password))
        {
            res.json({user,userId:encryptId,message:'login successful'})
        }else{
            res.status(409).json({error: 'incorrect password'})}
        
    } catch (error) {
        console.log(error)
        res.status(400).json({error: 'could not login user'})
    }
}

userController.verify = async(req,res) => {

    try {
        const user = await UserAuth.authorizeUser(
            req.headers.authorization)
            if(user){
                const encryptId = jwt.sign({userId:user.id},
                    process.env.JWT_SECRET)
                res.json({
                    user,userId:encryptId,
                    message:'user verified'})
            }else{res.status(401).json({error: 'no user to verify'})}
            // if(check-item){yes-dothis}else{no-do this}  check/do
             // if(check-item){yes-dothis}else if(check 2){yes-do this} else{no-do this}  check/do
    } catch (error) {
        console.log(error)
        res.status(400).json({error: 'could not verify user'})
    }
}

// get profile


module.exports = userController