const router = require("express").Router();
const BaitProducts = require("../models/Bait_Product");


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
  try {
    if (!id) {
      return res.status(400).json({ message: "Product id is required", status: "error" });
    }

    // get products by user id
    const product = await BaitProducts.findById(id);
    if(!product){
      return res.status(404).json({ message: "Product not found", status: "error" });
    }
    res.status(200).json({product, status: "success" });
  } catch (err) {
    res.status(500).json({ message: err.message, status: "error" });
  }
});




module.exports = router;
