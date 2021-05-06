const userRoutes = require('express').Router()
const userController = require('../controllers/userController')

userRoutes.post('/signup', userController.signup)
userRoutes.post('/login', userController.login)
userRoutes.get('/verify',userController.verify)
userRoutes.get('/profile', userController.profile);
userRoutes.put('/profile', userController.update);

module.exports = userRoutes