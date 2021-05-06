// grab models
const models = require('../models');

// user auth
const UserAuth = require('../middleware/UserAuth');

// controller obj
const orderController = {};

// create order
orderController.create = async (req, res) =>
{
    try {
        // grab user
        const user = await UserAuth.authorizeUser(req.headers.authorization);
        // check if user exists
        if (user)
        {
            // create order
            const order = await models.order.create({
                total: 0,
                address: req.body.address,
                card: req.body.card
            })
            // add order to user
            await user.addOrder(order);
            // reload order to show user
            await order.reload();
            // return new order
            res.json({ message: 'order created', order });
        }
        // no user
        else
        {
            // status 401 - unauthorized
            res.status(401).json({ error: 'unauthorized to create an order' });
        }
    } catch (error) {
        // status 400 - bad request
        res.status(400).json({ error: 'could not create order' });
    }
}

// get user's orders
orderController.getAll = async (req, res) =>
{
    try {
        // grab user
        const user = await UserAuth.authorizeUser(req.headers.authorization);
        // check if user exists
        if (user)
        {
            // grab users orders with products
            const orders = await user.getOrders({ include: { model: models.cart_item }});
            // check if orders exist
            if (orders)
            {
                // return orders
                res.json({ message: 'orders found', orders });
            }
            // no orders
            else
            {
                // status 404 - not found
                res.status(404).json({ error: 'no orders found' });
            }
        }
        // no user
        else
        {
            // status 401 - unauthorized
            res.status(401).json({ error: 'unauthorized to get orders' });
        }
    } catch (error) {
        console.log(error.message);
        // status 400 - bad request
        res.status(400).json({ error: 'could not get orders' })
    }
}

// get single user's order
orderController.getOne = async (req, res) =>
{
    try {
        // grab user
        const user = await UserAuth.authorizeUser(req.headers.authorization);
        // check if user exists
        if (user)
        {
            // grab users order with products
            const order = await user.getOrders({ where: { id: req.params.id }, include: { model: models.cart_item }});
            // check if order exists
            if (order)
            {
                // return order
                res.json({ message: 'order found', order });
            }
            // no order
            else
            {
                // status 404 - not found
                res.status(404).json({ error: 'no order found' });
            }
        }
        // no user
        else
        {
            // status 401 - unauthorized
            res.status(401).json({ error: 'unauthorized to get order' });
        }
    } catch (error) {
        // status 400 - bad request
        res.status(400).json({ error: 'could not get order' })
    }
}

// update order
orderController.update = async (req, res) =>
{
    try {
        // grab user
        const user = await UserAuth.authorizeUser(req.headers.authorization);
        // check if user exists
        if (user)
        {
            // grab users order with products
            const order = await user.getOrders({ where: { id: req.params.id }, include: { model: models.cart_item }});
            // check if order exists
            if (order.length > 0)
            {
                // update order
                order[0].update(req.body);
                // return order
                res.json({ message: 'order found', order: order[0] });
            }
            // no order
            else
            {
                // status 404 - not found
                res.status(404).json({ error: 'no order found' });
            }
        }
        // no user
        else
        {
            // status 401 - unauthorized
            res.status(401).json({ error: 'unauthorized to update order' });
        }
    } catch (error) {
        console.log(error.message);
        // status 400 - bad request
        res.status(400).json({ error: 'could not update order' })
    }
}

module.exports = orderController;