const mongoose = require("mongoose");

// order_Schema
const Order_Schema = new mongoose.Schema(
  {
    order_id: {
      type: String,
      unique: false,
      uppercase: true,
    },
    order_by: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
    },
    requested_delivery_type: {
      type: String,
    },
    delivery_times: {
      type: Date,
    },
    phone_number: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      // required: true,
    },
    transaction_id: {
      type: mongoose.Types.ObjectId,
      ref: "Transaction"
    },
    payment_Status: {
      type: String,
    },

    payment_method: {
      type: String,
    },
    product_id: {
      type: String,
    },

    product_quantity: {
      type: Number,
    },
    product_price: {
      type: Number,
    },
    delivery_address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip_code: {
      type: String,
    },
    country: {
      type: String,
    },
    order_status: {
      type: String,
    },
    // directions  of the order
    longitude: {
      type: String,
    },
    latitude: {
      type: String,
    },
    products: [
      {
        id: {
          type: mongoose.Types.ObjectId,
          ref: "bait_products",
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    total_price: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("orders", Order_Schema);
