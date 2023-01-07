const router = require('express').Router();
const jwt = require('jsonwebtoken')
const cart = require('../models/Cart');

router.get('/my', async (req, res) => {
    const token = req.headers['token'] || req.body.token || req.cookies.token;
    try {
        // check token exists 
        if (!token) {
            return res.status(401).json({ message: "Access Denied" });
        }
        // check token is valid
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        if (!verified) {
            return res.status(401).json({ message: "Access Denied" });
        }

        // get user id from token
        const userId = verified.id;
        const myCarts = await cart.find({ user_id: userId });
        return res.status(200).json({
            message: "carts fetched", 
            status: "error", 
            carts: myCarts
        });

    } catch (error) {
        return res.status(500).json({ message: error.message, status: "error" });
    }
})


module.exports = router;