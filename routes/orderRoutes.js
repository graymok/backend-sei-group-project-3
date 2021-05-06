// grab controller
const orderController = require('../controllers/orderController');
// express
const express = require('express');
const orderRoutes = express.Router();

// routes

orderRoutes.get('/', orderController.getAll);
orderRoutes.get('/:id', orderController.getOne);
orderRoutes.put('/:id', orderController.update);

module.exports = orderRoutes;