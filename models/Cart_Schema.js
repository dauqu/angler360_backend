const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const router = express.Router();

const cart_Schema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    product_id: {
      type: String,
      required: true,
    },
    product_quantity: {
      type: String,
      required: true,
    },
    product_price: {
      type: Number,
      required: true,
    },
    product_name: {
      type: String,
      required: true,
    },
    product_title: {
      type: String,
      required: true,
    },
    product_type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("cart", cart_Schema);
