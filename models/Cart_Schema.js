const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const router = express.Router();

const cart_Schema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "users",
    },
    product_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "bait_products"
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    },
    total_price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("cart", cart_Schema);
