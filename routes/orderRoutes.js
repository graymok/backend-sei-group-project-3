// grab controller
const orderController = require('../controllers/orderController');
// express
const express = require('express');
const orderRoutes = express.Router();

// routes

orderRoutes.post('/', orderController.create);
orderRoutes.get('/', orderController.getAll);
orderRoutes.get('/:id', orderController.getOne);

module.exports = orderRoutes;