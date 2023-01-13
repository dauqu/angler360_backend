const router = require('express').Router();
const jwt = require('jsonwebtoken')
const cart = require('../models/Cart_Schema');

router.get('/my', async (req, res) => {
    const token = req.headers['token'] || req.body.token || req.cookies.token;
    try {
        // check token exists 
        if (!token) {
            return res.status(401).json({ message: "Access Denied" });
        }
        // check token is valid
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) {
            return res.status(401).json({ message: "Access Denied" });
        }

        // get user id from token
        const userId = verified.id;
        const myCarts = await cart.find({ 
            user_id: userId
        }).populate('product_id');
        return res.status(200).json({
            message: "carts fetched", 
            status: "success", 
            carts: myCarts
        });

    } catch (error) {
        return res.status(500).json({ message: error.message, status: "error" });
    }
})

// increase quantity by cart id 
router.patch('/qty/inc/:id', async (req, res) => {
    const token = req.headers['token'] || req.body.token || req.cookies.token;
    try {
        // check token exists
        if (!token) {
            return res.status(401).json({ message: "Access Denied" });
        }
        // check token is valid
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) {
            return res.status(401).json({ message: "Access Denied" });
        }

        const getCart = await cart.findById(req.params.id).populate('product_id');
        if(!getCart) {
            return res.status(404).json({ message: "Cart not found", status: "error" });
        }
        const qty = getCart.quantity + 1;
        const newtotal = qty*getCart.product_id.product_price;
        // get user id from token
        const updateCart = await cart.findByIdAndUpdate(req.params.id, {$inc: {quantity: 1}, total_price: newtotal}, {new: true });
        await updateCart.save();
        
        return res.status(200).json({
            message: "Cart updated successfully",
            status: "success",
            cart: updateCart
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message, status: "error" });
    }
})
router.patch('/qty/dec/:id', async (req, res) => {
    const token = req.headers['token'] || req.body.token || req.cookies.token;
    try {
        // check token exists
        if (!token) {
            return res.status(401).json({ message: "Access Denied" });
        }
        // check token is valid
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) {
            return res.status(401).json({ message: "Access Denied" });
        }

        const getCart = await cart.findById(req.params.id).populate('product_id');
        if(!getCart) {
            return res.status(404).json({ message: "Cart not found", status: "error" });
        }
        const qty = getCart.quantity - 1;
        const newtotal = qty*getCart.product_id.product_price;
        // get user id from token
        const updateCart = await cart.findByIdAndUpdate(req.params.id, {$inc: {quantity: -1}, total_price: newtotal}, );

        return res.status(200).json({
            message: "Cart updated successfully",
            status: "success",
            cart: updateCart
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message, status: "error" });
    }
})

router.delete('/delete/:id', async (req, res) => {
    const token = req.headers['token'] || req.body.token || req.cookies.token;
    try {
        // check token exists

        if (!token) {
            return res.status(401).json({ message: "Access Denied" });
        }
        // check token is valid
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        if (!verified) {
            return res.status(401).json({ message: "Access Denied" });
        }

        const getCart = await cart.findById(req.params.id);
        if(!getCart) {
            return res.status(404).json({ message: "Cart not found", status: "error" });
        }
        // get user id from token
        const deleteCart = await cart.findByIdAndDelete(req.params.id);
        const allCart = await cart.find({ user_id: verified.id });
        return res.status(200).json({
            message: "Cart deleted successfully",
            status: "success",
            deletedCart: deleteCart,
            allcart: allCart
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message, status: "error" });
    }
})


router.post("/add/my", async (req, res) => {
    const token = req.headers["token"] || req.body.token || req.cookies.token;
    
    console.log(req.body);

    try {
        if(!token) {
            return res.status(401).json({ message: "Access Denied" });
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) {
            return res.status(401).json({ message: "Access Denied" });
        }

        const userId = verified.id;
        const { product_id, quantity, total_price } = req.body;
        const newCart = new cart({
            user_id: userId,
            product_id,
            quantity,
            total_price: total_price
        })

        await newCart.save();
        return res.status(200).json({
            message: "Cart added successfully",
            status: "success",
            cart: newCart
        })

    } catch (error) {
        return res.status(500).json({ 
            message: error.message, 
            status: "error" 
    });
    }
})

module.exports = router;