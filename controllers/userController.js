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
userController.profile = async (req, res) =>
{
    try {
        // grab authorized user
        const user = await UserAuth.authorizeUser(req.headers.authorization);
        // check if user exists
        if (user)
        {
            // encrypt id
            const encryptedId = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
            // return user with encrypted id
            res.json({ message: 'user profile found', user, userId: encryptedId })
        }
        // no user
        else
        {
            // status 404 - could not be found
            res.status(404).json({ error: 'no profile found'});
        }
    } catch (error) {
        // status 400 - bad request
        res.status(400).json({ error: 'failed to  load profile'});
    }
}

// update profile
userController.update = async (req, res) =>
{
    try {
        // grab authorized user
        const user = await UserAuth.authorizeUser(req.headers.authorization);
        // check if user exists
        if (user)
        {
            // check if updated email matches any current users emails
            const users = await models.user.findAll();
            users.forEach(u =>
            {
                // check if emails match and is not current email
                if (u.email === req.body.email && req.body.email !== user.email)
                {
                    // status 409 - conflict
                    res.status(409).json({ error: 'duplicate emails' });
                }
            })
            // update user
            user.update(req.body);
            // encrypt id
            const encryptedId = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
            // return user with encrypted id
            res.json({ message: 'user profile updated', user, userId: encryptedId })
        }
        // no user
        else
        {
            // status 404 - could not be found
            res.status(404).json({ error: 'no profile found'});
        }
    } catch (error) {
        // status 400 - bad request
        res.status(400).json({ error: 'failed to  update profile'});
    }
}

module.exports = userController