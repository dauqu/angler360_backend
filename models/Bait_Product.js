const mongoose = require("mongoose");

// Bait_product_schema

const bait_product_schema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_title: {
      type: String,
      required: true,
    },
    product_description: {
      type: String,
      required: true,
    },
    product_price: {
      type: Number,
      required: true,
    },
    product_type: {
      type: String,
      required: true,
    },
    product_image: {
      type: String,
      // required: true,
    },
    delivery_type: {
      type: String,
    },
    status: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Bait_Product = mongoose.model("bait_products", bait_product_schema);
module.exports = Bait_Product
