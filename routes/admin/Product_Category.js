const router = require("express").Router();
const Product_Category_validation = require("../../middleware/Product_Category_validation");
const Product_Category = require("../../models/Product_Category");
const upload = require('../../config/image_upload')

// code to get all product categories from database

router.get("/", async (req, res) => {
  try {
    const product_categories = await Product_Category.find();
    res.json(product_categories);
  } catch (err) {
    res.status(500).json({ message: err.message, status: "error" });
  }
});

// code to count total product categories
router.get("/count/allproductcategory", async (req, res) => {
  try {
    const product_categories = await Product_Category.find();
    // send total product categories
    res.json({
      message: "Total product categories is " + product_categories.length,
      total_product_categories: product_categories.length,
    });
  } catch (err) {
    res.json({ message: err });
  }
});

// code to add product_category to database
router.post("/", 
Product_Category_validation, 
upload.single("category_image")
, async (req, res) => {
  const url = req.protocol + "://"+ req.get("host") + "/medias/" + req.file.filename;

  const add_product_category = new Product_Category({
    image: url,
    status: "active",
    category_name: req.body.category_name,
    category_description: req.body.category_description,
    category_slug: Math.random().toString(36).slice(2, 7).toUpperCase(),
    
  });
  try {
    const new_product_category = await add_product_category.save();
    res.status(201).json(new_product_category);
  } catch (err) {
    res.status(400).json({ message: err.message, status: "error" });
  }
});
// code to get product_category by id from database
router.get("/:id", async (req, res) => {
  try {
    const product_category = await Product_Category.findById(req.params.id);
    res.json(product_category);
  } catch (err) {
    res.status(500).json({ message: err.message, status: "error" });
  }
});

// code to delete product_category from database
router.delete("/:id", async (req, res) => {
  try {
    await Product_Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Product Category deleted", status: "success" });
  } catch (error) {
    res.status(500).json({ message: err.message, status: "error" });
  }
});

module.exports = router;
