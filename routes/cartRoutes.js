const cartRoutes = require('express').Router()
const cartController = require('../controllers/cartController')


cartRoutes.get('/', cartController.getCart)
cartRoutes.post('/', cartController.addItem)
cartRoutes.delete('/:productId',cartController.delete)

module.exports = cartRoutes

