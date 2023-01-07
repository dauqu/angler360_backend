const Product_Category = require("../models/Product_Category");

// code for validation to check if the category name already exists in the database

async function Product_Category_validation(req, res, next) {
  const category_name = await Product_Category.findOne({
    category_name: req.body.category_name,
  });
  if (category_name) {  
    return res.status(400).json({
      message: "Category name already exists",
    });
  }

  next();
}

module.exports = Product_Category_validation;
