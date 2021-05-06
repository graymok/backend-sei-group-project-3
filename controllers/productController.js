// grab models
const models = require('../models');

// user auth
const UserAuth = require('../middleware/UserAuth');

// controller obj
const productController = {};


// get all products
productController.getAll = async (req, res) =>
{
    try {
        // grab user
        const user = await UserAuth.authorizeUser(req.headers.authorization);
        // check if user exists
        if (user)
        {
            // grab products
            const products = await models.product.findAll();
            // check if products exist
            if (products)
            {
                // return products
                res.json({ message: 'products found', products });
            }
            // no products
            else
            {
                // status 404 - not found
                res.status(404).json({ error: 'no products found' });
            }
        }
        // no user
        else
        {
            // status 401 - unauthorized
            res.status(401).json({ error: 'unauthorized to get products' });
        }
    } catch (error) {
        // status 400 - bad request
        res.status(400).json({ error: 'could not get products' })
    }
}

// get one product
productController.getOne = async (req, res) =>
{
    try {
        // grab user
        const user = await UserAuth.authorizeUser(req.headers.authorization);
        // check if user exists
        if (user)
        {
            // grab product
            const product = await models.product.findOne({ where: { id: req.params.id }});
            // check if product exist
            if (product)
            {
                // return product
                res.json({ message: 'product found', product });
            }
            // no product
            else
            {
                // status 404 - not found
                res.status(404).json({ error: 'no product found' });
            }
        }
        // no user
        else
        {
            // status 401 - unauthorized
            res.status(401).json({ error: 'unauthorized to get product' });
        }
    } catch (error) {
        // status 400 - bad request
        res.status(400).json({ error: 'could not get product' })
    }
}

module.exports = productController;