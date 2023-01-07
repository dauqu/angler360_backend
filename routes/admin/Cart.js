const router = require("express").Router();
const Cart_validation = require("../../middleware/Cart_validation");
const Bait_Product = require("../../models/Bait_Product");
const Cart_Schema = require("../../models/Cart_Schema");


// code to get all cart products
router.get("/", async (req, res) => {
  try {
    const cart = await Cart_Schema.find();
    res.json(cart);
  } catch (err) {
    res.json({ message: err.message, status: "error" });
  }
});

// code to get cart products by  id
router.get("/:id", async (req, res) => {
  try {
    const cart = await Cart_Schema.findById(req.params.id);
    res.json(cart);
  } catch (err) {
    res.json({ message: err.message, status: "error" });
  }
});

// code to add item into cart
router.post("/", Cart_validation, async (req, res) => {
  const cart = new Cart_Schema({
    user_id: req.body.user_id,
    product_id: req.body.product_id,
    product_quantity: req.body.product_quantity,
    product_price: req.body.product_price,
    product_name: req.body.product_name,
    product_title: req.body.product_title,
    product_type: req.body.product_type,
  });

  try {
    const savedCart = await cart.save();
    res.status(201).json({ message: "Cart created", status: "success" });
  } catch (err) {
    res.status(400).json({ message: err.message, status: "error" });
  }
});

// code to count total product_price from all records
router.get("/total/sale", async (req, res) => {
  try {
    const cart = await Cart_Schema.find();
    let total = 0;
    cart.forEach((item) => {
      total += item.product_price;
    });

    res.json({ message: "Total Price is : " + total, status: "success" });
  } catch (err) {
    res.json({ message: err.message, status: "error" });
  }
});

// code to delete cart product by id
router.delete("/:id", async (req, res) => {
  try {
    const cart = await Cart_Schema.findByIdAndDelete(req.params.id);
    cart.remove();
    res.json({ message: "Cart deleted", status: "success" });
  } catch (err) {
    res.status(500).json({ message: err.message, status: "error" });
  }
});

module.exports = router;
