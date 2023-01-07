require("dotenv").config();
const mongoose = require("mongoose");

// Product_Category_schema
const product_category_schema = new mongoose.Schema({
  category_name: {
    type: String,
    required: true,
  },

  category_description: {
    type: String,
    required: true,
  },
  category_slug: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    require: true,
    default: "active"
  },
  image: {
    type: String,
    required: true,
    default: "https://www.shutterstock.com/image-vector/grunge-green-category-word-round-260nw-1794170542.jpg"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("product_categories", product_category_schema);
