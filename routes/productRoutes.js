// grab controller
const productController = require('../controllers/productController');
// express
const express = require('express');
const productRoutes = express.Router();

// routes

productRoutes.get('/', productController.getAll);
productRoutes.get('/:id', productController.getOne);

module.exports = productRoutes;