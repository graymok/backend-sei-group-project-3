const models = require('../models');
const cart = require('../models/cart_item')

const UserAuth = require('../middleware/UserAuth');

const cartController = {}

cartController.getCart = async (req,res) => {
try {
    const user = await UserAuth.authorizeUser(req.headers.authorization)

    if(user)
    {
        const cart = await user.getCart_items({ include: { model: models.product }})

        if(cart)
        {
        
            res.json({message:'cart found', cart })
        }
        else
        {
            res.status(404).json({error: 'no cart found'})
        }

    }
    else
    {
        res.status(401).json({error: 'unauthorized to get cart' })
    }
} catch (error) {
    console.log(error.message);
    res.status(400).json({error:'could not find cart'})
}

}

cartController.addItem = async(req,res) => {
try {
    const user = await UserAuth.authorizeUser(req.headers.authorization)  
    const product = await models.product.findOne({
        where:{id: req.body.productId}
    })
    if(user && product){
        
        const addItem = await models.cart_item.create()
        await user.addCart_item(addItem)
        await product.addCart_item(addItem)
        await addItem.reload()
    res.json({addItem})    
    }else{

        res.status(404).json({error:'can not find product'})
    }

     
} catch (error) {
    console.log(error.message);
    res.status(400).json({error:'can not add item'})
}
}

cartController.delete = async(req,res)=>{
try {
    const user = await UserAuth.authorizeUser(req.headers.authorization)  
    
if(user){
    const product = await models.cart_item.findOne({
        where:{ createdAt: req.body.createdAt }
    })
    if(product){
        const deleteItem = await product.destroy()
        res.json({message:'removal successful'})
    }else{
        res.status(404).json({error:'can not find product'})}
}else{
    res.status(404).json({error:'can not find user'})
}
  
} catch (error) {
    res.status(418).json({error:"can not delete item"})
}
}


module.exports = cartController
