// grab models
const models = require('../models');
// data encryption
const jwt = require('jsonwebtoken');

// helper obj
const UserAuth = {};

/* Call in any controller file by using:
        const UserAuth = require('../middleware/UserAuth');
    at the top of the file. Then call with:
        await UserAuth.authorizeUser(req.headers.authorization)
    to get back true (user exists) or false (user does not exist)
*/
UserAuth.authorizeUser = async (authId) =>
{
    try {
        // check if request requires authorization
        if (authId)
        {
            // decrypt user id
            const decryptedId = jwt.verify(authId, process.env.JWT_SECRET);
            // grab user
            const user = await models.user.findOne({ where: { id: decryptedId.userId}});
            // return authorized user if it exists
            return user ? user : null;
        }
        // no auth headers in request
        else
        {
            return null;
        }
    } catch (error) {
        // status 400 - bad request
        res.status(400).json({ message: 'user authorization error', error: error.message })
    }
}

module.exports = UserAuth;