const router = require("express").Router();
const BaitProducts = require("../models/Bait_Product");
const jwt = require("jsonwebtoken");
const Cart = require("../models/Cart_Schema");

// code to get products by id from database
router.get("/", async (req, res) => {
  try {
    // get products by user id
    const products = await BaitProducts.find({status: "active" })
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message, status: "error" });
  }
});

// code to get products by id from database
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const token = req.headers["token"] || req.cookies.token || req.body.token;
  
  try {
    //check if token is provided
    if (!token) {
      return res.status(400).json({ message: "Token is required", status: "error" });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if(!verified){
      return res.status(400).json({ message: "Token is invalid", status: "error" });
    }
    
    if (!id) {
      return res.status(400).json({ message: "Product id is required", status: "error" });
    }
    // get user id from token
    const id_from_token = verified.id;
    console.log(id_from_token);
    console.log(id);
    
    // find product is alread in cart 
    const product_in_cart = await Cart.findOne({ user_id: id_from_token, product_id: id });
    const product = await BaitProducts.findById(id);

    if(product_in_cart){
      return res.status(200).json({already: true, message: "Product is already in cart", status: "success", product: product });
    }
    
    // get products by user id
    if(!product){
      return res.status(404).json({ message: "Product not found", status: "error" });
    }
    res.status(200).json({product, already: false, status: "success" });
  } catch (err) {
    res.status(500).json({ message: err.message, status: "error" });
  }
});




module.exports = router;
