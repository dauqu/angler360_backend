const router = require("express").Router();
const Order = require("../models/Order_Schema");
const jwt = require("jsonwebtoken");
const Cart = require("../models/Cart_Schema");
const Product = require("../models/Bait_Product");
const Transaction = require("../models/Transaction");

router.get("/my", async (req, res) => {
  const token = req.headers["token"] || req.body.token || req.cookies.token;
  try {
    // check if token  is valid
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    if (!verify) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // get user id from token
    const id_from_token = verify.id;
    const allorders = await Order.find({ order_by: id_from_token }).populate([
      {
        path: "products.id",
      },{
        path: "order_by",
      }
    ]);
    res.json({ message: "orders found", status: "success", orders: allorders });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

router.post("/", async (req, res) => {
  const token = req.headers["token"] || req.body.token || req.cookies.token;
  try {
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    if (!verify) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    let payment = JSON.parse(req.body.payment);

    // get user id from token
    const id_from_token = verify.id;

    // all carts of user
    const allcarts = await Cart.find({ user_id: id_from_token });
    if (allcarts.length == 0) {
      return res
        .status(400)
        .json({ message: "No cart found", status: "error" });
    }


    // // get total price of all carts
    let total_price = 0;
    allcarts.forEach((cart) => {
      total_price += cart.total_price;
    });
    
    // create new transaction 
    const newTransactions = new Transaction({
      user: id_from_token,
      payerId: payment.payerID,
      status: payment.status,
      amount: total_price,
      paypal_id: payment.paymentId,
      payer: payment.data.payer,
      transaction: payment.data.transactions,
    })

    
    // get all product ids
    const productIds = [];
    allcarts.forEach((cart) => {
      let product = {};
      product.id = cart.product_id;
      product.quantity = cart.quantity;
      productIds.push(product);
    });
    
    // create new order 
    const order = new Order({
      order_by: id_from_token,
      total_price: total_price,
      products: productIds,
      transaction_id: newTransactions._id
    });
    
    // order id 
    order.order_id = order._id;
    
    if (req.body?.delivery_address) order.delivery_address = req.body.delivery_address;
    if (req.body?.city) order.city = req.body.city;
    if (req.body?.state) order.state = req.body.state;
    if (req.body?.country) order.country = req.body.country;
    if (req.body?.zip_code) order.zip_code = req.body.zip_code;
    
    const savedOrder = await order.save();
    
    // save the transaction
    newTransactions.order_id = savedOrder._id;
    await newTransactions.save();
    
    // delete all carts
    await Cart.deleteMany({ user_id: id_from_token });
    res.json({
      message: "order created",
      status: "success",
      order: savedOrder,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "error" });
  }
});

module.exports = router;
