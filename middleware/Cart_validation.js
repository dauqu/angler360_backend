const Cart_Schema = require("../models/Cart_Schema");

// code to check if product is already in cart or not
async function Cart_validation(req, res, next) {
  try {
    const { user_id, product_id } = req.body;
    const product_exist = await Cart_Schema.findOne({
      user_id,
      product_id,
    });

    if (product_exist) {
      return res.status(400).json({
        message: "This product is already in cart",
        status: "warning",
      });
    }
  } catch (error) {
    console.log("(Cart_validation error) " + error);
    return res.status(500).json({ message: error.message, status: "error" });
  }
  next();
}

module.exports = Cart_validation;
