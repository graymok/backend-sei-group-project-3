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
                total: req.body.total,
                address: req.body.address,
                card: req.body.card
            }, { include: [ { model: models.cart_item }]})
            // add order to user
            await user.addOrder(order);
            // add each cart item to order
            req.body.cart.forEach(async (item) => {
                const cartItem = await models.cart_item.findOne({ where: { id: item.id }});
                order.addCart_item(cartItem);
                user.removeCart_item(cartItem);
            })
            // reload order to show user
            await order.reload();
            // return new order
            res.json({ message: 'order created', order: { id: order.id, total: order.total, card: order.card, address: order.address.split('|')[0], city: order.address.split('|')[1], zip: order.address.split('|')[2], state: order.address.split('|')[3] } });
        }
        // no user
        else
        {
            // status 401 - unauthorized
            res.status(401).json({ error: 'unauthorized to create an order' });
        }
    } catch (error) {
        console.log(error.message);
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
            // grab users order with cart item's products
            const order = await user.getOrders({ where: { id: req.params.id }, include: { model: models.cart_item, incldue: { model: models.product } }});
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